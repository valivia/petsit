import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    })

  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = account.id
      }
      return token
    },
    async session({ session, token, user }) {

      if (session.user) {
        session.user.id = user.id;
        session.user.firstName = user.firstName;
        session.user.lastName = user.lastName;
        session.user.role = user.role;
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
