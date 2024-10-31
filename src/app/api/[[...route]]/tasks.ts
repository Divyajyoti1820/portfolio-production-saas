import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import z from "zod";

import { boards, columns, tasks } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

const app = new Hono()
  .post(
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
          z.object({
            title: z.string(),
            isCompleted: z.boolean().default(false),
          })
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
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));
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
        return c.json(
          { error: "[TASKS_CREATE] : Failed to create board" },
          400
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .get(
    "/:boardId/:columnId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        boardId: z.string(),
        columnId: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, columnId } = c.req.valid("param");
      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[TASKS_GET] : Board not found" }, 400);
      }

      const column = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));
      if (!column || column.length === 0) {
        return c.json({ error: "[TASKS_GET] : Column not found" }, 400);
      }

      const data = await db
        .select()
        .from(tasks)
        .where(eq(tasks.columnId, columnId));

      if (!data) {
        return c.json({ error: "[TASKS_GET] : Failed to get tasks" }, 400);
      }

      if (data.length === 0) {
        return c.json({ data: [] });
      }

      return c.json({ data: data });
    }
  )
  .get(
    "/:boardId/:columnId/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({ boardId: z.string(), columnId: z.string(), id: z.string() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, columnId, id } = c.req.valid("param");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[TASK_GET] : Board not found" }, 400);
      }

      const column = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));
      if (!column || column.length === 0) {
        return c.json({ error: "[TASK_GET] : Column not found" }, 400);
      }

      const data = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.columnId, columnId), eq(tasks.id, id)));

      if (!data) {
        return c.json({ error: "[TASK_GET] : Task not found" }, 400);
      }

      return c.json({ data: data[0] });
    }
  )
  .delete(
    "/:boardId/:columnId/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({ boardId: z.string(), columnId: z.string(), id: z.string() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, columnId, id } = c.req.valid("param");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[TASK_GET] : Board not found" }, 400);
      }

      const column = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));
      if (!column || column.length === 0) {
        return c.json({ error: "[TASK_GET] : Column not found" }, 400);
      }

      const data = await db
        .delete(tasks)
        .where(and(eq(tasks.columnId, columnId), eq(tasks.id, id)))
        .returning();

      if (!data || data.length === 0) {
        return c.json({ error: "[TASK_GET] : Task not found" }, 400);
      }

      return c.json({ data: data[0].id });
    }
  );

export default app;
