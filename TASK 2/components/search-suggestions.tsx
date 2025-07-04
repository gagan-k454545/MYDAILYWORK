"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const INDIAN_COMPANIES = [
  "Tata Consultancy Services",
  "Infosys Limited",
  "Wipro Technologies",
  "Flipkart",
  "Zomato",
  "Paytm",
  "Amazon India",
  "Microsoft India",
  "Google India",
  "Accenture",
  "HCL Technologies",
  "Tech Mahindra",
  "Ola Cabs",
  "Swiggy",
  "BYJU'S",
  "PhonePe",
  "Myntra",
  "BigBasket",
  "Nykaa",
  "PolicyBazaar",
]

const JOB_TITLES = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "Business Analyst",
  "UI/UX Designer",
  "Quality Assurance Engineer",
  "Mobile App Developer",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "Digital Marketing Specialist",
  "Content Developer",
  "Operations Manager",
]

const INDIAN_LOCATIONS = [
  "Bangalore, Karnataka",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Gurgaon, Haryana",
  "Noida, Uttar Pradesh",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Kochi, Kerala",
  "Indore, Madhya Pradesh",
  "Jaipur, Rajasthan",
  "Coimbatore, Tamil Nadu",
  "Remote",
  "Work from Home",
]

interface SearchInputProps {
  name: string
  placeholder: string
  defaultValue?: string
  type: "search" | "location"
}

export function SearchInput({ name, placeholder, defaultValue, type }: SearchInputProps) {
  const [value, setValue] = useState(defaultValue || "")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const getSuggestionList = () => {
    if (type === "search") {
      return [...INDIAN_COMPANIES, ...JOB_TITLES]
    }
    return INDIAN_LOCATIONS
  }

  useEffect(() => {
    if (value.length > 0) {
      const filtered = getSuggestionList()
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [value, type])

  return (
    <div className="relative">
      {type === "search" && (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => value.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className={type === "search" ? "pl-10" : ""}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                setValue(suggestion)
                setShowSuggestions(false)
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
