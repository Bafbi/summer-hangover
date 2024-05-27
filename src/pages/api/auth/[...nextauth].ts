// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await db
          .select(users)
          .where(users.email.eq(credentials.email))
          .single();

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  adapter: DrizzleAdapter(db, { users }),
  pages: {
    signIn: "/auth/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
