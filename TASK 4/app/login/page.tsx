// app/login/page.tsx
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] py-12">
      <LoginForm />
    </div>
  )
}
