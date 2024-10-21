import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import z from "zod";
import bcrypt from "bcryptjs";

/* Important for handling Next-Auth Types*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
/* Important for handling Next-Auth Types*/

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const validateFields = CredentialsSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }

        const { email, password } = validateFields.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
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
