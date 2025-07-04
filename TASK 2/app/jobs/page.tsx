import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sql, fallbackJobs } from "@/lib/db"
import type { Job } from "@/lib/db"
import Link from "next/link"
import { MapPin, Clock, DollarSign } from "lucide-react"
import { SearchInput } from "@/components/search-suggestions"

async function getJobs(searchQuery?: string, location?: string, jobType?: string): Promise<Job[]> {
  try {
    if (!sql) {
      console.log("Using fallback data - database not connected")
      let jobs = [...fallbackJobs]

      // Apply search filters
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        jobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.company_name.toLowerCase().includes(query) ||
            (job.requirements && job.requirements.toLowerCase().includes(query)),
        )
      }

      if (location && location.trim()) {
        const locationQuery = location.toLowerCase().trim()
        jobs = jobs.filter((job) => job.location.toLowerCase().includes(locationQuery))
      }

      if (jobType && jobType !== "All" && jobType.trim()) {
        jobs = jobs.filter((job) => job.job_type === jobType)
      }

      // Sort by featured first, then by date
      return jobs.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1
        if (!a.is_featured && b.is_featured) return 1
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    }

    // Database query logic
    let query = `
      SELECT * FROM jobs 
      WHERE is_active = true
    `
    const params: any[] = []

    if (searchQuery && searchQuery.trim()) {
      query += ` AND (title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1} OR company_name ILIKE $${params.length + 1})`
      params.push(`%${searchQuery.trim()}%`)
    }

    if (location && location.trim()) {
      query += ` AND location ILIKE $${params.length + 1}`
      params.push(`%${location.trim()}%`)
    }

    if (jobType && jobType !== "All" && jobType.trim()) {
      query += ` AND job_type = $${params.length + 1}`
      params.push(jobType)
    }

    query += ` ORDER BY is_featured DESC, created_at DESC`

    const jobs = await sql.unsafe(query, params)
    return Array.isArray(jobs) ? (jobs as Job[]) : []
  } catch (error) {
    console.error("Error fetching jobs:", error)
    console.log("Using fallback data due to database error")

    // Apply same filtering logic to fallback data
    let jobs = [...fallbackJobs]

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.company_name.toLowerCase().includes(query) ||
          (job.requirements && job.requirements.toLowerCase().includes(query)),
      )
    }

    if (location && location.trim()) {
      const locationQuery = location.toLowerCase().trim()
      jobs = jobs.filter((job) => job.location.toLowerCase().includes(locationQuery))
    }

    if (jobType && jobType !== "All" && jobType.trim()) {
      jobs = jobs.filter((job) => job.job_type === jobType)
    }

    return jobs.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1
      if (!a.is_featured && b.is_featured) return 1
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }
}

interface JobsPageProps {
  searchParams: Promise<{
    search?: string
    location?: string
    type?: string
  }>
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{job.job_type}</Badge>
          {job.is_featured && <Badge variant="outline">Featured</Badge>}
        </div>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <CardDescription className="font-medium text-primary">{job.company_name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {new Date(job.created_at).toLocaleDateString()}
          </div>
          {job.salary_min && job.salary_max && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />₹{(job.salary_min / 100000).toFixed(1)}L - ₹
              {(job.salary_max / 100000).toFixed(1)}L per annum
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
        <Button asChild className="w-full">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function JobsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-4 bg-muted rounded w-20 mb-2"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </div>
            <div className="h-16 bg-muted rounded mb-4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function JobsList({ searchParams }: { searchParams: { search?: string; location?: string; type?: string } }) {
  const jobs = await getJobs(searchParams.search, searchParams.location, searchParams.type)

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
        <p className="text-muted-foreground mb-4">
          {searchParams.search || searchParams.location || searchParams.type
            ? "Try adjusting your search criteria or browse all jobs."
            : "No jobs are currently available."}
        </p>
        {(searchParams.search || searchParams.location || searchParams.type) && (
          <Button asChild variant="outline">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Found {jobs.length} job{jobs.length !== 1 ? "s" : ""}
          {searchParams.search && ` matching "${searchParams.search}"`}
          {searchParams.location && ` in ${searchParams.location}`}
          {searchParams.type && searchParams.type !== "All" && ` for ${searchParams.type} positions`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Jobs in India</h1>
        <p className="text-muted-foreground">
          Find opportunities with top Indian companies across major cities like Bangalore, Mumbai, Delhi, Hyderabad,
          Pune, and Chennai.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Jobs
              </label>
              <SearchInput
                name="search"
                placeholder="Try: TCS, Software Engineer, Data Scientist"
                defaultValue={params.search}
                type="search"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <SearchInput
                name="location"
                placeholder="Try: Bangalore, Mumbai, Delhi, Hyderabad"
                defaultValue={params.location}
                type="location"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Job Type
              </label>
              <Select name="type" defaultValue={params.type || "All"}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Search Jobs
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <Suspense fallback={<JobsLoading />}>
        <JobsList searchParams={params} />
      </Suspense>
    </div>
  )
}
