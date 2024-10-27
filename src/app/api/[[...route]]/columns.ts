import { zValidator } from "@hono/zod-validator";

import { Hono } from "hono";
import z from "zod";

import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { boards, columns } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono()
  .get(
    "/column-list",
    verifyAuth(),
    zValidator("param", z.object({ boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId } = c.req.valid("param");
      const data = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!data || !data[0]) {
        return c.json({ error: "[COLUMNS_GET] : Failed to fetch board" }, 400);
      }

      const columnsData = await db
        .select()
        .from(columns)
        .where(and(eq(columns.boardId, boardId)));

      if (!columnsData || !columnsData[0]) {
        return c.json(
          { error: "[COLUMNS_GET] : Failed to fetch columns" },
          400
        );
      }

      return c.json({ data: columnsData });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string(), boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id, boardId } = c.req.valid("param");

      const board = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!board || !board[0]) {
        return c.json({ error: "[COLUMN_GET] : Failed to fetch board" }, 400);
      }

      const data = await db
        .select()
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, id)));

      if (!data || !data[0]) {
        return c.json({ error: "[COLUMN_GET] : Failed to fetch column" }, 400);
      }

      return c.json({ data: data });
    }
  )
  .post(
    "/create-column",
    verifyAuth(),
    zValidator("param", z.object({ boardId: z.string() })),
    zValidator("json", z.object({ title: z.string().min(3) })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId } = c.req.valid("param");
      const { title } = c.req.valid("json");

      const board = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!board || !board[0]) {
        return c.json({ error: "[COLUMN_GET] : Failed to fetch board" }, 400);
      }

      const data = await db
        .insert(columns)
        .values({
          title,
          boardId,
        })
        .returning();

      if (!data || !data[0]) {
        return c.json(
          { error: "[COLUMN_CREATE] : Failed to create a column" },
          400
        );
      }

      return c.json({ data: data[0].id });
    }
  )
  .delete(
    "/delete-column",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string(), boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id, boardId } = c.req.valid("param");

      const board = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!board || !board[0]) {
        return c.json({ error: "[COLUMN_GET] : Failed to fetch board" }, 400);
      }

      const data = await db
        .delete(columns)
        .where(and(eq(columns.id, id), eq(columns.boardId, boardId)))
        .returning();

      if (!data || !data[0]) {
        return c.json(
          { error: "[COLUMN_DELETE] : Failed to delete a column" },
          400
        );
      }

      return c.json({ data: data[0].id });
    }
  )
  .patch(
    "/",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string(), boardId: z.string() })),
    zValidator("json", z.object({ title: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id, boardId } = c.req.valid("param");
      const { title } = c.req.valid("json");

      const board = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));

      if (!board || !board[0]) {
        return c.json({ error: "[COLUMN_GET] : Failed to fetch board" }, 400);
      }

      const data = await db
        .update(columns)
        .set({
          title: title,
        })
        .where(and(eq(columns.id, id), eq(columns.boardId, boardId)))
        .returning();

      if (!data || !data[0]) {
        return c.json(
          { error: "[COLUMN_DELETE] : Failed to delete a column" },
          400
        );
      }

      return c.json({ data: data[0].id });
    }
  );

export default app;
