// src/server/auth.ts
import NextAuth, { type NextAuthOptions, getServerSession, DefaultSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { users, sessions, accounts, verificationTokens } from '~/server/db/schema';
import { createTable } from "~/server/db/schema";
import { env } from '~/env.js';
import { type GetServerSidePropsContext } from 'next';
import { Adapter } from 'next-auth/adapters';

/**
 * Module augmentation pour les types `next-auth`. Permet d'ajouter des propriétés personnalisées à l'objet `session` tout en conservant la sécurité des types.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

/**
 * Options pour NextAuth.js utilisées pour configurer les adaptateurs, les fournisseurs, les callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session callback:', session, token); // Debug session
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      console.log('JWT callback:', token, user); // Debug JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = credentials;

        try {
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          });

          if (!user) {
            throw new Error('Invalid email');
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return { id: user.id, email: user.email, name: user.firstName };
          } else {
            throw new Error('Invalid password');
          }
        } catch (error) {
          throw new Error('Error logging in user: ' + (error as Error).message);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/app/signout',
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper pour `getServerSession` afin que vous n'ayez pas besoin d'importer `authOptions` dans chaque fichier.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);