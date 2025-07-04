import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser, clearUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Briefcase, User, LogOut, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

async function signOut() {
  "use server"
  await clearUserSession()
  redirect("/login")
}

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-orange-600" />
          <span className="font-bold text-xl">
            <span className="text-orange-600">Job</span>
            <span className="text-green-600">India</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Browse Jobs
          </Link>
          {user?.user_type === "employer" && (
            <Link href="/employer/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          )}
          {user?.user_type === "candidate" && (
            <Link href="/candidate/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.first_name} {user.last_name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={user.user_type === "employer" ? "/employer/dashboard" : "/candidate/dashboard"}>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={signOut}>
                    <button type="submit" className="flex items-center w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/jobs" className="text-sm font-medium">
                Browse Jobs
              </Link>
              {user?.user_type === "employer" && (
                <Link href="/employer/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
              )}
              {user?.user_type === "candidate" && (
                <Link href="/candidate/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
              )}

              <div className="border-t pt-4">
                {user ? (
                  <>
                    <p className="text-sm font-medium mb-2">
                      {user.first_name} {user.last_name}
                    </p>
                    <form action={signOut}>
                      <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" asChild className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
