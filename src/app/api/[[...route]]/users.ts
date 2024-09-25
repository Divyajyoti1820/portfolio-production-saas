import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

import bcrypt from "bcryptjs";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6).max(20),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return c.json({ error: "[AUTHENTICATION] : Email Already exists" }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return c.json(null, 200);
  }
);

export default app;
