"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { authClient } from "@/lib/auth-client"
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth"

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.data) {
        router.refresh()

        const role = result.data.user.role

        if (role === "CLIENT") {
          router.push("/jobs/create")
        } else {
          router.push("/jobs")
        }
      } else {
        alert(result.error?.message ?? "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-surface p-8 shadow-sm"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>

          <p className="mt-2 text-muted">
            Login to your FreelanceHub account
          </p>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="field w-full rounded-xl p-3.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="field w-full rounded-xl p-3.5"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-primary p-3.5 font-medium text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
