import { NextRequest } from "next/server"

import { requireRoleFromRequest } from "@/lib/server/session-request"
import { createJobSchema } from "@/lib/validations/job.schema"
import { createJob, getJobs } from "@/services/jobs.service"

export async function GET() {
  try {
    const jobs = await getJobs()

    return Response.json(jobs)
  } catch (error) {
    console.error("Failed to fetch jobs:", error)

    return Response.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireRoleFromRequest(request, ["CLIENT"])

    if ("error" in authResult) {
      return authResult.error
    }

    const { session } = authResult

    const body = await request.json()

    const validated = createJobSchema.safeParse({
      ...body,
      budget: Number(body.budget),
    })

    if (!validated.success) {
      return Response.json(
        { error: validated.error.flatten() },
        { status: 400 },
      )
    }

    const job = await createJob({
      ...validated.data,
      clientId: session.user.id,
    })

    return Response.json(job, { status: 201 })
  } catch (error) {
    console.error("Failed to create job:", error)

    return Response.json(
      { error: "Failed to create job" },
      { status: 500 },
    )
  }
}
