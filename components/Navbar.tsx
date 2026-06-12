"use client"

import { authClient } from "@/lib/auth-client"

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Freelance<span className="text-primary">Hub</span>
            </a>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="/skills"
                className="text-muted hover:text-foreground transition-colors"
              >
                Skills
              </a>
              {user?.role === "CLIENT" && (
                <a
                  href="/jobs/create"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Post a Job
                </a>
              )}
              <a
                href="/jobs"
                className="text-muted hover:text-foreground transition-colors"
              >
                Jobs
              </a>
            </div>
          </div>

          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium">
                {user.name}
                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {user.role}
                </span>
              </span>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
              >
                Log in
              </a>
              <a
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-sm transition-colors"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
