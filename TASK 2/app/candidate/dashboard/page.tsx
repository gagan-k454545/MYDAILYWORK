import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import type { CandidateProfile } from "@/lib/db"
import Link from "next/link"
import { User, Briefcase, FileText, Edit, MapPin, Clock, Building } from "lucide-react"

async function getCandidateApplications(candidateId: number) {
  try {
    const applications = await sql`
      SELECT 
        a.*,
        j.title as job_title,
        j.company_name,
        j.location,
        j.job_type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.candidate_id = ${candidateId}
      ORDER BY a.applied_at DESC
    `
    return applications
  } catch (error) {
    console.error("Error fetching applications:", error)
    return []
  }
}

async function getCandidateProfile(userId: number): Promise<CandidateProfile | null> {
  try {
    const profiles = await sql`
      SELECT * FROM candidate_profiles WHERE user_id = ${userId}
    `
    return (profiles[0] as CandidateProfile) || null
  } catch (error) {
    console.error("Error fetching candidate profile:", error)
    return null
  }
}

async function updateProfile(formData: FormData) {
  "use server"

  const user = await getCurrentUser()

  if (!user || user.user_type !== "candidate") {
    redirect("/login")
  }

  const bio = formData.get("bio") as string
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s)
  const experienceYears = formData.get("experienceYears") as string
  const education = formData.get("education") as string
  const linkedinUrl = formData.get("linkedinUrl") as string
  const portfolioUrl = formData.get("portfolioUrl") as string

  try {
    await sql`
      UPDATE candidate_profiles 
      SET 
        bio = ${bio || null},
        skills = ${skills.length > 0 ? skills : null},
        experience_years = ${experienceYears ? Number.parseInt(experienceYears) : null},
        education = ${education || null},
        linkedin_url = ${linkedinUrl || null},
        portfolio_url = ${portfolioUrl || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${user.id}
    `
  } catch (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }
}

export default async function CandidateDashboard() {
  const user = await getCurrentUser()

  if (!user || user.user_type !== "candidate") {
    redirect("/login")
  }

  const applications = await getCandidateApplications(user.id)
  const profile = await getCandidateProfile(user.id)

  const totalApplications = applications.length
  const pendingApplications = applications.filter((app: any) => app.status === "pending").length
  const acceptedApplications = applications.filter((app: any) => app.status === "accepted").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Candidate Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.first_name}! Manage your profile and track your applications.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedApplications}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Job Applications</h2>
            <Button asChild>
              <Link href="/jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Jobs
              </Link>
            </Button>
          </div>

          {applications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">Start applying to jobs to see your applications here.</p>
                <Button asChild>
                  <Link href="/jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application: any) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{application.job_title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {application.company_name}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.location}
                          </span>
                        </CardDescription>
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
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <p>Applied: {new Date(application.applied_at).toLocaleDateString()}</p>
                        <p>Job Type: {application.job_type}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${application.job_id}`}>View Job</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Profile Information</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your profile to help employers learn more about you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input value={user.first_name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input value={user.last_name} disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell employers about yourself, your experience, and what you're looking for..."
                    defaultValue={profile?.bio || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g. React, Node.js, Python, SQL"
                    defaultValue={profile?.skills?.join(", ") || ""}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experienceYears">Years of Experience</Label>
                    <Input
                      id="experienceYears"
                      name="experienceYears"
                      type="number"
                      min="0"
                      defaultValue={profile?.experience_years || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      name="education"
                      placeholder="e.g. Bachelor's in Computer Science"
                      defaultValue={profile?.education || ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      defaultValue={profile?.linkedin_url || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                    <Input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      defaultValue={profile?.portfolio_url || ""}
                    />
                  </div>
                </div>

                <Button type="submit">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
