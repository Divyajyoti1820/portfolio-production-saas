import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import z from "zod";

import { db } from "@/db/drizzle";
import { boards } from "@/db/schema";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      title: z.string().min(3),
      columns: z.array(z.string()),
    })
  ),
  async (c) => {
    const auth = c.get("authUser");

    const { title, columns } = c.req.valid("json");

    if (!auth.token?.id) {
      return c.json({ error: "Un-Authorized Access" }, 401);
    }

    const data = await db
      .insert(boards)
      .values({
        userId: auth.token.id,
        title,
        columns,
      })
      .returning();

    if (!data[0]) {
      return c.json({ error: "[CREATE_BOARD] : Failed to create board" }, 401);
    }

    return c.json({ data: data[0] });
  }
);

export default app;
