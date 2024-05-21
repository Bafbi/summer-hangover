// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

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
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
