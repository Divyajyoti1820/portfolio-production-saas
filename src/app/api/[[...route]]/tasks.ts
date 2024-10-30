import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import z from "zod";

import { boards, columns, tasks } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

const app = new Hono().post(
  "/:boardId",
  verifyAuth(),
  zValidator("param", z.object({ boardId: z.string() })),
  zValidator(
    "json",
    z.object({
      title: z.string().min(3),
      description: z
        .optional(z.string())
        .default("You can add description for"),

      columnId: z.string(),
      subtasks: z.array(
        z.object({ title: z.string(), isCompleted: z.boolean().default(false) })
      ),
    })
  ),
  async (c) => {
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Un-Authorized Access" }, 401);
    }

    const { boardId } = c.req.valid("param");
    const { title, description, columnId, subtasks } = c.req.valid("json");

    const board = await db
      .select({ id: boards.id })
      .from(boards)
      .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
    if (!board || board.length === 0) {
      return c.json({ error: "[TASKS_CREATE] : Board not found" }, 400);
    }

    const column = await db
      .select({ id: columns.id })
      .from(columns)
      .where(and(eq(boards.id, boardId), eq(columns.id, columnId)));
    if (!column || column.length === 0) {
      return c.json({ error: "[TASKS_CREATE] : Column not found" }, 400);
    }

    const data = await db
      .insert(tasks)
      .values({
        title,
        description,
        columnId,
        subtasks,
      })
      .returning();

    if (!data || data.length === 0) {
      return c.json({ error: "[TASKS_CREATE] : Failed to create board" }, 400);
    }

    return c.json({ data: data[0] });
  }
);

export default app;
