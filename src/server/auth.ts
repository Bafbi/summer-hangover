// src/server/auth.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
  type SessionOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.js";
import { db } from "~/server/db";
import { createTable } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const session: Partial<SessionOptions> = {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
};

const adapter = DrizzleAdapter(db, createTable) as Adapter;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    //   async signIn({ user }) {
    //     if (
    //       req.query.nextauth?.includes("callback") &&
    //       req.query.nextauth?.includes("credentials") &&
    //       req.method === "POST"
    //     ) {
    //       if (user && "id" in user) {
    //         const sessionToken = crypto.randomUUID()
    //         const sessionExpiry = new Date(Date.now() + session.maxAge! * 1000)
    //         const forwarded = req.headers["x-forwarded-for"] as string
    //         const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

    //         if (!adapter.createSession) return false
    //         await adapter.createSession({
    //           sessionToken,
    //           userId: user.id,
    //           expires: sessionExpiry,
    //           userAgent: req.headers["user-agent"] ?? null,
    //           ip,
    //         } as any)

    //         const cookies = new Cookies(req, res)
    //         cookies.set("next-auth.session-token", sessionToken, {
    //           expires: sessionExpiry,
    //         })
    //       }
    //     }

    //     return true
    //   },
    // },
    // jwt: {
    //   encode(params) {
    //     if (
    //       req.query.nextauth?.includes("callback") &&
    //       req.query.nextauth?.includes("credentials") &&
    //       req.method === "POST"
    //     ) {
    //       const cookies = new Cookies(req, res)
    //       const cookie = cookies.get("next-auth.session-token")

    //       if (cookie) return cookie
    //       else return ""
    //     }
    //     // Revert to default behaviour when not in the credentials provider callback flow
    //     return encode(params)
    //   },
    //   async decode(params) {
    //     if (
    //       req.query.nextauth?.includes("callback") &&
    //       req.query.nextauth?.includes("credentials") &&
    //       req.method === "POST"
    //     ) {
    //       return null
    //     }
    //     // Revert to default behaviour when not in the credentials provider callback flow
    //     return decode(params)
    //   },
  },
  adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // Add logic to verify credentials here
    //     if (!credentials) return null;
    //     const { email, password } = credentials;
    //     console.log("credentials", credentials);
    //     // Fetch user and password hash from your database
    //     const user = await getUserByEmail(email);
    //     console.log("user", user);
    //     if (user?.password == null) throw new Error("Invalid credentials");
    //     if (user && bcrypt.compareSync(password, user.password)) {
    //       return { id: user.id, name: user.name, email: user.email };
    //     } else {
    //       throw new Error("Invalid credentials");
    //     }
    //   },
    // }),
  ],
  theme: {
    logo: "/summer-hangover-icon.png",
    brandColor: "#679c69",
    colorScheme: "auto",
    buttonText: "Patate",
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
  session,
};

/**
 * Wrapper pour `getServerSession` afin que vous n'ayez pas besoin d'importer `authOptions` dans chaque fichier.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

// async function getUserByEmail(email: string) {
//   const user = await db.query.users.findFirst({
//     where: (users, { eq }) => eq(users.email, email),
//   });
//   return user;
// }
