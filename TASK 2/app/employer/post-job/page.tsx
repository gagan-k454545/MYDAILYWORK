import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

async function createJob(formData: FormData) {
  "use server"

  const user = await getCurrentUser()

  if (!user || user.user_type !== "employer") {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const requirements = formData.get("requirements") as string
  const location = formData.get("location") as string
  const jobType = formData.get("jobType") as string
  const salaryMin = formData.get("salaryMin") as string
  const salaryMax = formData.get("salaryMax") as string
  const companyName = formData.get("companyName") as string
  const isFeatured = formData.get("isFeatured") === "on"

  if (!title || !description || !location || !jobType || !companyName) {
    throw new Error("Missing required fields")
  }

  try {
    const result = await sql`
      INSERT INTO jobs (
        employer_id, title, description, requirements, location, job_type,
        salary_min, salary_max, company_name, is_featured, is_active
      )
      VALUES (
        ${user.id}, ${title}, ${description}, ${requirements || null}, ${location}, ${jobType},
        ${salaryMin ? Number.parseInt(salaryMin) : null}, ${salaryMax ? Number.parseInt(salaryMax) : null},
        ${companyName}, ${isFeatured}, true
      )
      RETURNING id
    `

    const jobId = result[0].id
    redirect(`/jobs/${jobId}?posted=true`)
  } catch (error) {
    console.error("Error creating job:", error)
    throw new Error("Failed to create job posting")
  }
}

export default async function PostJobPage() {
  const user = await getCurrentUser()

  if (!user || user.user_type !== "employer") {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/employer/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Create a job posting to attract qualified candidates to your company.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createJob} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input id="title" name="title" placeholder="e.g. Senior Software Engineer" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" name="companyName" defaultValue={user.company_name || ""} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" placeholder="e.g. San Francisco, CA or Remote" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <Select name="jobType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary (Optional)</Label>
                <Input id="salaryMin" name="salaryMin" type="number" placeholder="e.g. 80000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary (Optional)</Label>
                <Input id="salaryMax" name="salaryMax" type="number" placeholder="e.g. 120000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (Optional)</Label>
              <Textarea
                id="requirements"
                name="requirements"
                rows={4}
                placeholder="List the required skills, experience, education, etc..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="isFeatured" name="isFeatured" />
              <Label htmlFor="isFeatured" className="text-sm">
                Make this a featured job posting (appears at the top of listings)
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Post Job
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/employer/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
