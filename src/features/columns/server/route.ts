import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import z from "zod";

import { boards, columns, tasks } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { db } from "@/db";
import { and, asc, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get(
    "/:boardId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        boardId: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId } = c.req.valid("param");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[COLUMNS_GET] : Board not found" }, 400);
      }

      const data = await db
        .select()
        .from(columns)
        .where(eq(columns.boardId, boardId))
        .orderBy(asc(columns.createdAt));

      if (!data || data.length === 0) {
        return c.json(
          { error: "[COLUMN_GET] : Failed to fetch columns." },
          401
        );
      }

      return c.json({ data: data });
    }
  )
  .get(
    "/:boardId/:id",
    verifyAuth(),
    zValidator("param", z.object({ boardId: z.string(), id: z.string() })),

    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, id } = c.req.valid("param");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[COLUMN_GET] : Board not found" }, 400);
      }

      const data = await db
        .select()
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, id)));

      if (!data || data.length === 0) {
        return c.json(
          { error: "[COLUMN_GET] : Failed to fetch columns." },
          401
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ boardId: z.string(), title: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("param");
      const { boardId, title } = c.req.valid("json");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[COLUMN_GET] : Board not found" }, 400);
      }

      const data = await db
        .update(columns)
        .set({
          title: title,
        })
        .where(and(eq(columns.boardId, boardId), eq(columns.id, id)))
        .returning();

      if (!data || data.length === 0) {
        return c.json(
          { error: "[COLUMN_GET] : Failed to update columns." },
          401
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("param");
      const { boardId } = c.req.valid("json");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[COLUMN_GET] : Board not found" }, 400);
      }

      const data = await db
        .delete(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, id)))
        .returning();
      if (!data || data.length === 0) {
        return c.json(
          { error: "[COLUMN_GET] : Failed to delete columns." },
          401
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        boardId: z.string(),
        title: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, title } = c.req.valid("json");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[COLUMN_GET] : Board not found" }, 400);
      }

      const data = await db
        .insert(columns)
        .values({
          title,
          boardId,
        })
        .returning();

      if (!data || data.length === 0) {
        return c.json(
          { error: "[COLUMN_GET] : Failed to fetch columns." },
          401
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/columns-with-tasks/:boardId",
    verifyAuth(),
    zValidator("param", z.object({ boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId } = c.req.valid("param");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!board || board.length === 0) {
        return c.json(
          { error: "[COLUMNS_WITH_TASKS_GET] : Board not found" },
          400
        );
      }

      const columnsData = await db
        .select()
        .from(columns)
        .where(eq(columns.boardId, boardId))
        .orderBy(asc(columns.createdAt));

      if (!columnsData || columnsData.length === 0) {
        return c.json({ data: [] });
      }

      const allTasks = await db
        .select()
        .from(tasks)
        .where(
          inArray(
            tasks.columnId,
            columnsData.map((col) => col.id)
          )
        );

      const results = columnsData.map((column) => ({
        column: { ...column },
        tasks: allTasks.filter((task) => task.columnId === column.id),
      }));

      if (!results || results.length === 0) {
        return c.json({ data: [] });
      }

      return c.json({ data: results });
    }
  );

export default app;
