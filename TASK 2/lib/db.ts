import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set - using fallback data")
}

export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

// Enhanced fallback data with more Indian companies and jobs
export const fallbackJobs = [
  {
    id: 1,
    employer_id: 1,
    title: "Senior Software Engineer",
    description:
      "Join TCS to work on cutting-edge technology solutions for global clients. You'll be working with React, Node.js, and cloud technologies. Great opportunity for career growth in a multinational environment.",
    requirements:
      "Bachelor's degree in Computer Science, 5+ years experience with React and Node.js, Strong problem-solving skills",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1200000,
    salary_max: 1800000,
    company_name: "Tata Consultancy Services",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    employer_id: 2,
    title: "Frontend Developer",
    description:
      "Work with India's leading e-commerce platform to create amazing user experiences. Join Flipkart's frontend team to build responsive web applications.",
    requirements: "3+ years React experience, TypeScript knowledge, Experience with responsive design",
    location: "Hyderabad, Telangana",
    job_type: "Full-time",
    salary_min: 800000,
    salary_max: 1200000,
    company_name: "Flipkart",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    employer_id: 3,
    title: "Data Scientist",
    description:
      "Join Zomato's data science team to work on recommendation systems and business intelligence solutions. Help shape the future of food delivery in India.",
    requirements: "Master's in Data Science, Python expertise, Machine learning experience",
    location: "Gurgaon, Haryana",
    job_type: "Full-time",
    salary_min: 1500000,
    salary_max: 2200000,
    company_name: "Zomato",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    employer_id: 4,
    title: "Java Developer",
    description:
      "Infosys is hiring Java Developers for enterprise application development. Work on large-scale distributed systems for global clients.",
    requirements: "Bachelor's degree in CS, 2+ years Java experience, Spring Framework knowledge",
    location: "Pune, Maharashtra",
    job_type: "Full-time",
    salary_min: 600000,
    salary_max: 1000000,
    company_name: "Infosys Limited",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    employer_id: 5,
    title: "DevOps Engineer",
    description:
      "Wipro Technologies is seeking DevOps Engineers to join our cloud infrastructure team. Work with cutting-edge technologies to automate deployment processes.",
    requirements: "3+ years DevOps experience, AWS/Azure knowledge, Docker and Kubernetes expertise",
    location: "Chennai, Tamil Nadu",
    job_type: "Full-time",
    salary_min: 1000000,
    salary_max: 1500000,
    company_name: "Wipro Technologies",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    employer_id: 6,
    title: "Product Manager",
    description:
      "Paytm is looking for a Product Manager to lead our fintech product initiatives. Drive product strategy for India's leading digital payments platform.",
    requirements: "MBA preferred, 4+ years product management experience, fintech background",
    location: "Noida, Uttar Pradesh",
    job_type: "Full-time",
    salary_min: 1800000,
    salary_max: 2500000,
    company_name: "Paytm",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 7,
    employer_id: 7,
    title: "Software Development Engineer",
    description:
      "Join Amazon India to build world-class e-commerce solutions. Work on scalable systems that serve millions of customers across India.",
    requirements: "Bachelor's in CS, 2+ years experience in Java/Python, distributed systems knowledge",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1500000,
    salary_max: 2200000,
    company_name: "Amazon India",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    employer_id: 8,
    title: "Cloud Solution Architect",
    description:
      "Help enterprise customers in India adopt Microsoft Azure cloud solutions. Design and implement cloud architectures for digital transformation.",
    requirements: "5+ years cloud experience, Azure certifications preferred, enterprise client experience",
    location: "Hyderabad, Telangana",
    job_type: "Full-time",
    salary_min: 1800000,
    salary_max: 2500000,
    company_name: "Microsoft India",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 9,
    employer_id: 9,
    title: "Site Reliability Engineer",
    description:
      "Ensure the reliability and performance of Google services in India. Work on monitoring, automation, and infrastructure scaling.",
    requirements: "3+ years SRE experience, Linux and networking knowledge, monitoring tools expertise",
    location: "Gurgaon, Haryana",
    job_type: "Full-time",
    salary_min: 1600000,
    salary_max: 2300000,
    company_name: "Google India",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 10,
    employer_id: 10,
    title: "UX Designer",
    description:
      "Design user experiences for Google Pay in India. Focus on payment flows, financial services, and localization for Indian users.",
    requirements: "4+ years UX design experience, mobile app design portfolio, payment ecosystem knowledge",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1500000,
    salary_max: 2200000,
    company_name: "Google India",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 11,
    employer_id: 11,
    title: "Backend Engineer",
    description:
      "Build and maintain backend systems for Swiggy's food delivery platform. Work on order management, payment processing, and delivery optimization.",
    requirements: "3+ years backend development, Java/Python/Node.js proficiency, microservices experience",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1200000,
    salary_max: 1800000,
    company_name: "Swiggy",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 12,
    employer_id: 12,
    title: "Data Scientist - Mobility",
    description:
      "Analyze transportation data to improve Ola's services. Work on demand forecasting, route optimization, and pricing algorithms.",
    requirements: "Master's in Data Science, 3+ years ML experience, transportation domain knowledge",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1400000,
    salary_max: 2000000,
    company_name: "Ola Cabs",
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 13,
    employer_id: 13,
    title: "Mobile App Developer",
    description:
      "Develop native Android and iOS apps for BYJU'S learning platform. Create engaging educational experiences for millions of students.",
    requirements: "3+ years mobile development, React Native or native development, educational app experience",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_min: 1000000,
    salary_max: 1600000,
    company_name: "BYJU'S",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 14,
    employer_id: 14,
    title: "Cybersecurity Analyst",
    description:
      "Protect client systems and data from cyber threats. Monitor security incidents and implement security solutions for enterprise clients.",
    requirements: "3+ years cybersecurity experience, security tools knowledge, certifications preferred",
    location: "Chennai, Tamil Nadu",
    job_type: "Full-time",
    salary_min: 1000000,
    salary_max: 1500000,
    company_name: "HCL Technologies",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 15,
    employer_id: 15,
    title: "Business Analyst",
    description:
      "Work with clients across various industries to analyze business requirements and implement digital transformation solutions.",
    requirements: "2+ years business analysis experience, requirement gathering skills, client-facing experience",
    location: "Mumbai, Maharashtra",
    job_type: "Full-time",
    salary_min: 700000,
    salary_max: 1100000,
    company_name: "Accenture",
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export interface User {
  id: number
  email: string
  password_hash: string
  user_type: "employer" | "candidate"
  first_name: string
  last_name: string
  company_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Job {
  id: number
  employer_id: number
  title: string
  description: string
  requirements?: string
  location: string
  job_type: string
  salary_min?: number
  salary_max?: number
  company_name: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Application {
  id: number
  job_id: number
  candidate_id: number
  cover_letter?: string
  resume_url?: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  applied_at: string
}

export interface CandidateProfile {
  id: number
  user_id: number
  bio?: string
  skills?: string[]
  experience_years?: number
  education?: string
  resume_url?: string
  linkedin_url?: string
  portfolio_url?: string
  created_at: string
  updated_at: string
}
