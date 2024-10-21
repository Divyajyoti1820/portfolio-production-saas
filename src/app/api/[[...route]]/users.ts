import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import z from "zod";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(30),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    const query = await db.select().from(users).where(eq(users.email, email));
    if (query[0]) {
      return c.json({ error: "Email already exists." }, 400);
    }

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return c.json(null, 200);
  }
);

export default app;
