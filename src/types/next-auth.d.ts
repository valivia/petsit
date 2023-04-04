import Prisma from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string

      name: string
      firstName: string
      lastName: string

      email: string
      image: string
    } & DefaultSession["user"]
  }

  interface User extends Prisma.User { };
}
