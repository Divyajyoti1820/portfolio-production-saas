import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import z from "zod";

import { db } from "@/db/drizzle";
import { boards, tasks } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      boardId: z.string(),
      title: z.string(),
      description: z.string(),
      column: z.string(),
      subtasks: z.array(
        z.object({ title: z.string(), completed: z.boolean().default(false) })
      ),
    })
  ),
  async (c) => {
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Un-Authorized Access" }, 401);
    }
    const { title, description, column, subtasks, boardId } =
      c.req.valid("json");

    if (!boardId) {
      return c.json({ error: "[CREATE_TASK]: boardId not found" }, 400);
    }

    const [board] = await db
      .select({ id: boards.id })
      .from(boards)
      .where(and(eq(boards.userId, auth.token.id), eq(boards.id, boardId)));
    if (!board) {
      return c.json({ error: "[CREATE_TASK] : Board not found" }, 400);
    }

    const data = await db
      .insert(tasks)
      .values({
        title,
        description,
        boardId: board.id,
        userId: auth.token.id,
        column,
        subtasks,
      })
      .returning();

    if (!data[0]) {
      return c.json({ error: "[CREATE_TASK] : Failed to create board" }, 401);
    }

    return c.json({ data: data[0] });
  }
);

export default app;
