import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { sql, fallbackJobs } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import type { Job, Application } from "@/lib/db"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Building, ArrowLeft } from "lucide-react"

async function getJob(id: string): Promise<Job | null> {
  try {
    if (!sql) {
      console.log("Using fallback data - database not connected")
      return fallbackJobs.find((job) => job.id === Number.parseInt(id)) || null
    }

    const jobs = await sql`
      SELECT * FROM jobs WHERE id = ${id} AND is_active = true
    `
    return (jobs[0] as Job) || null
  } catch (error) {
    console.error("Error fetching job:", error)
    return fallbackJobs.find((job) => job.id === Number.parseInt(id)) || null
  }
}

async function getApplication(jobId: number, candidateId: number): Promise<Application | null> {
  try {
    if (!sql) {
      return null // No applications in fallback mode
    }

    const applications = await sql`
      SELECT * FROM applications 
      WHERE job_id = ${jobId} AND candidate_id = ${candidateId}
    `
    return (applications[0] as Application) || null
  } catch (error) {
    console.error("Error fetching application:", error)
    return null
  }
}

async function applyToJob(formData: FormData) {
  "use server"

  const jobId = Number.parseInt(formData.get("jobId") as string)
  const coverLetter = formData.get("coverLetter") as string

  const user = await getCurrentUser()

  if (!user || user.user_type !== "candidate") {
    redirect("/login")
  }

  try {
    if (!sql) {
      // In fallback mode, just redirect with success message
      redirect(`/jobs/${jobId}?applied=true`)
      return
    }

    await sql`
      INSERT INTO applications (job_id, candidate_id, cover_letter, status)
      VALUES (${jobId}, ${user.id}, ${coverLetter}, 'pending')
    `

    // In a real app, you would send an email notification here
    redirect(`/jobs/${jobId}?applied=true`)
  } catch (error) {
    console.error("Error applying to job:", error)
    throw new Error("Failed to apply to job")
  }
}

interface JobDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ applied?: string }>
}

export default async function JobDetailPage({ params, searchParams }: JobDetailPageProps) {
  const { id } = await params
  const { applied } = await searchParams

  const job = await getJob(id)

  if (!job) {
    notFound()
  }

  const user = await getCurrentUser()
  let application: Application | null = null

  if (user && user.user_type === "candidate" && sql) {
    application = await getApplication(job.id, user.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      {applied && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <p className="text-green-800 font-medium">
              ✅ Application submitted successfully! The employer will review your application and get back to you.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <Badge variant="secondary">{job.job_type}</Badge>
                  {job.is_featured && <Badge variant="outline">Featured</Badge>}
                </div>
              </div>

              <CardTitle className="text-2xl md:text-3xl">{job.title}</CardTitle>
              <CardDescription className="text-lg font-medium text-primary">{job.company_name}</CardDescription>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </div>
                {job.salary_min && job.salary_max && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />₹{(job.salary_min / 100000).toFixed(1)} - ₹
                    {(job.salary_max / 100000).toFixed(1)} Lakhs per annum
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>
                </div>

                {job.requirements && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{job.requirements}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Card */}
          <Card>
            <CardHeader>
              <CardTitle>Apply for this Job</CardTitle>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">You need to sign in to apply for this job.</p>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/register?type=candidate">Create Account</Link>
                    </Button>
                  </div>
                </div>
              ) : user.user_type !== "candidate" ? (
                <p className="text-sm text-muted-foreground">Only job seekers can apply for jobs.</p>
              ) : application ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium text-sm">Application Status</p>
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
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied on {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <form action={applyToJob} className="space-y-4">
                  <input type="hidden" name="jobId" value={job.id} />

                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-sm font-medium">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                      placeholder="Tell the employer why you're interested in this position..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Apply Now
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{job.company_name}</p>
                <p className="text-sm text-muted-foreground">Location: {job.location}</p>
                <p className="text-sm text-muted-foreground">Job Type: {job.job_type}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
