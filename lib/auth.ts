
import { betterAuth } from "better-auth/minimal"
import { prismaAdapter } from "better-auth/adapters/prisma"
<<<<<<< HEAD
=======
import { nextCookies } from "better-auth/next-js"
>>>>>>> 0f1ef1b (jobs apis)
import { prisma } from "./db"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

<<<<<<< HEAD
=======
  plugins: [nextCookies()],

>>>>>>> 0f1ef1b (jobs apis)
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
})
