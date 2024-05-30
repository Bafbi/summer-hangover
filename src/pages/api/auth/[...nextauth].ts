// src/pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import { users, accounts, sessions, verificationTokens } from "~/server/db/schema";
import bcrypt from "bcryptjs";
import { env } from "~/env.mjs";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        try {
          console.log(`Attempting to find user with email: ${email}`);
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          });

          if (!user) {
            console.log(`User with email ${email} not found`);
            throw new Error("Invalid email");
          }

          console.log(`Comparing passwords: input(${password}) hashed(${user.password})`);
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            console.log(`Password for user with email ${email} matched`);
            return { id: user.id, email: user.email, name: user.firstName };
          } else {
            console.log(`Password for user with email ${email} did not match`);
            throw new Error("Invalid password");
          }
        } catch (error) {
          console.error("Error logging in user:", error);
          throw new Error(error.message as string);
        }
      }
    })
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/auth/signIn",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  },
});
