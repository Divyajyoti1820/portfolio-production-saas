/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

/* Important for handling Next-Auth Types*/
import { JWT } from "next-auth/jwt";
/* Important for handling Next-Auth Types*/

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import bcrypt from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

/* Handling type of Next-Auth */
declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}
/* Handling type of Next-Auth */

/* Form Schema */
const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
/* Form Schema */

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return null;
        }

        return user;
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
