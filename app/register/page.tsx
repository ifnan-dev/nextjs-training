"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { authClient } from "@/lib/auth-client"
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth"

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "FREELANCER",
    },
    mode: "onChange"
  })

  async function onSubmit(data: RegisterFormValues) {
    try {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      })

      if (result.data) {
        router.push("/login")
      } else {
        alert(result.error?.message ?? "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
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
            Create account
          </h1>
          <p className="mt-2 text-muted">Join FreelanceHub today</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="field w-full rounded-xl p-3.5"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
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

        <div>
          <select
            className="field w-full rounded-xl p-3.5"
            {...register("role")}
          >
            <option value="FREELANCER">Freelancer</option>
            <option value="CLIENT">Client</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-primary p-3.5 font-medium text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
