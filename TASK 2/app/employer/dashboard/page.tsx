import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import type { Job } from "@/lib/db"
import Link from "next/link"
import { Plus, Eye, Users, Briefcase, MapPin, Clock } from "lucide-react"

async function getEmployerJobs(employerId: number): Promise<Job[]> {
  try {
    const jobs = await sql`
      SELECT * FROM jobs 
      WHERE employer_id = ${employerId}
      ORDER BY created_at DESC
    `
    return jobs as Job[]
  } catch (error) {
    console.error("Error fetching employer jobs:", error)
    return []
  }
}

async function getJobApplications(employerId: number) {
  try {
    const applications = await sql`
      SELECT 
        a.*,
        j.title as job_title,
        u.first_name,
        u.last_name,
        u.email,
        cp.bio,
        cp.skills,
        cp.experience_years
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      JOIN users u ON a.candidate_id = u.id
      LEFT JOIN candidate_profiles cp ON u.id = cp.user_id
      WHERE j.employer_id = ${employerId}
      ORDER BY a.applied_at DESC
    `
    return applications
  } catch (error) {
    console.error("Error fetching applications:", error)
    return []
  }
}

async function updateApplicationStatus(formData: FormData) {
  "use server"

  const applicationId = Number.parseInt(formData.get("applicationId") as string)
  const status = formData.get("status") as string

  const user = await getCurrentUser()

  if (!user || user.user_type !== "employer") {
    redirect("/login")
  }

  try {
    await sql`
      UPDATE applications 
      SET status = ${status}
      WHERE id = ${applicationId}
    `

    // In a real app, you would send an email notification here
  } catch (error) {
    console.error("Error updating application status:", error)
    throw new Error("Failed to update application status")
  }
}

export default async function EmployerDashboard() {
  const user = await getCurrentUser()

  if (!user || user.user_type !== "employer") {
    redirect("/login")
  }

  const jobs = await getEmployerJobs(user.id)
  const applications = await getJobApplications(user.id)

  const activeJobs = jobs.filter((job) => job.is_active).length
  const totalApplications = applications.length
  const pendingApplications = applications.filter((app: any) => app.status === "pending").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.first_name}! Manage your job postings and applications.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Job Postings</h2>
            <Button asChild>
              <Link href="/employer/post-job">
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>

          {jobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by posting your first job to attract talented candidates.
                </p>
                <Button asChild>
                  <Link href="/employer/post-job">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={job.is_active ? "default" : "secondary"}>
                        {job.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {job.is_featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {applications.filter((app: any) => app.job_id === job.id).length} applications
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <h2 className="text-2xl font-bold">Job Applications</h2>

          {applications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground">
                  Applications will appear here once candidates start applying to your jobs.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application: any) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {application.first_name} {application.last_name}
                        </CardTitle>
                        <CardDescription>Applied for: {application.job_title}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          application.status === "accepted"
                            ? "default"
                            : application.status === "rejected"
                              ? "destructive"
                              : application.status === "reviewed"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Email: {application.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Applied: {new Date(application.applied_at).toLocaleDateString()}
                        </p>
                        {application.experience_years && (
                          <p className="text-sm text-muted-foreground">
                            Experience: {application.experience_years} years
                          </p>
                        )}
                      </div>

                      {application.skills && application.skills.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {application.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.cover_letter && (
                        <div>
                          <p className="text-sm font-medium mb-2">Cover Letter:</p>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                            {application.cover_letter}
                          </p>
                        </div>
                      )}

                      {application.status === "pending" && (
                        <div className="flex gap-2">
                          <form action={updateApplicationStatus}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="status" value="reviewed" />
                            <Button type="submit" variant="outline" size="sm">
                              Mark as Reviewed
                            </Button>
                          </form>
                          <form action={updateApplicationStatus}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="status" value="accepted" />
                            <Button type="submit" size="sm">
                              Accept
                            </Button>
                          </form>
                          <form action={updateApplicationStatus}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="status" value="rejected" />
                            <Button type="submit" variant="destructive" size="sm">
                              Reject
                            </Button>
                          </form>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
