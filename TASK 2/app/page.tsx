import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sql } from "@/lib/db"
import type { Job } from "@/lib/db"
import { MapPin, Clock, DollarSign, Briefcase, Users, Search } from "lucide-react"

const fallbackJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company_name: "TechCorp",
    location: "Bangalore",
    job_type: "Full-time",
    created_at: new Date(),
    salary_min: 1000000,
    salary_max: 1500000,
    description: "Develop and maintain software applications.",
    is_featured: true,
    is_active: true,
  },
  {
    id: "2",
    title: "Data Scientist",
    company_name: "Data Solutions",
    location: "Mumbai",
    job_type: "Full-time",
    created_at: new Date(),
    salary_min: 1200000,
    salary_max: 1800000,
    description: "Analyze data and build machine learning models.",
    is_featured: true,
    is_active: true,
  },
  {
    id: "3",
    title: "Web Developer",
    company_name: "WebTech",
    location: "Delhi",
    job_type: "Contract",
    created_at: new Date(),
    salary_min: 800000,
    salary_max: 1200000,
    description: "Design and develop web applications.",
    is_featured: false,
    is_active: true,
  },
  {
    id: "4",
    title: "Product Manager",
    company_name: "ProductCo",
    location: "Hyderabad",
    job_type: "Full-time",
    created_at: new Date(),
    salary_min: 1500000,
    salary_max: 2000000,
    description: "Manage the product lifecycle and roadmap.",
    is_featured: false,
    is_active: true,
  },
  {
    id: "5",
    title: "Marketing Manager",
    company_name: "MarketNow",
    location: "Chennai",
    job_type: "Full-time",
    created_at: new Date(),
    salary_min: 900000,
    salary_max: 1400000,
    description: "Develop and execute marketing strategies.",
    is_featured: false,
    is_active: true,
  },
  {
    id: "6",
    title: "HR Manager",
    company_name: "HR Solutions",
    location: "Pune",
    job_type: "Full-time",
    created_at: new Date(),
    salary_min: 1100000,
    salary_max: 1600000,
    description: "Manage human resources functions.",
    is_featured: false,
    is_active: true,
  },
]

async function getFeaturedJobs(): Promise<Job[]> {
  try {
    if (!sql) {
      console.log("Using fallback data - database not connected")
      return fallbackJobs.filter((job) => job.is_featured)
    }

    const jobs = await sql`
      SELECT * FROM jobs 
      WHERE is_featured = true AND is_active = true 
      ORDER BY created_at DESC 
      LIMIT 6
    `
    return Array.isArray(jobs) ? (jobs as Job[]) : []
  } catch (error) {
    console.error("Error fetching featured jobs:", error)
    console.log("Using fallback data due to database error")
    return fallbackJobs.filter((job) => job.is_featured)
  }
}

export default async function HomePage() {
  const featuredJobs = await getFeaturedJobs()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Job in India</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with top Indian companies like TCS, Infosys, Flipkart, and Zomato. Discover opportunities across
            Bangalore, Mumbai, Delhi, Hyderabad, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/jobs">
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs in India
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Briefcase className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Active Jobs in India</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Indian Companies</p>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold mb-2">₹12 LPA</h3>
              <p className="text-muted-foreground">Average Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Job Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked job opportunities from top companies looking for talented professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{job.job_type}</Badge>
                    <Badge variant="outline">Featured</Badge>
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
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect job through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?type=candidate">I'm Looking for a Job</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register?type=employer">I'm Hiring</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
