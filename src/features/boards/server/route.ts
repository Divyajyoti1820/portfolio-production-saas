import { Hono } from "hono";

import z from "zod";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db";
import { eq, and, asc } from "drizzle-orm";
import { boards, columns } from "@/db/schema";

const app = new Hono()
  .post(
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
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { title, columns: Columns } = c.req.valid("json");

      const data = await db
        .insert(boards)
        .values({
          title,
          userId: auth.token.id,
        })
        .returning();

      if (data[0]) {
        for (const column of Columns) {
          await db.insert(columns).values({
            title: column,
            boardId: data[0].id,
          });
        }
      } else {
        return c.json(
          { error: "[BOARD_CREATE] : Failed to create board" },
          400
        );
      }

      return c.json({ data: data[0] });
    }
  )
  .get("/boards", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Un-Authorized Access" }, 401);
    }

    const data = await db
      .select({ id: boards.id, title: boards.title })
      .from(boards)
      .where(eq(boards.userId, auth.token.id))
      .orderBy(asc(boards.createdAt));

    if (!data) {
      return c.json(
        {
          error: "[BOARDS_GET] : Failed to get boards",
        },
        400
      );
    }

    return c.json({ data: data });
  })
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("query");

      const data = await db
        .select()
        .from(boards)
        .where(and(eq(boards.id, id), eq(boards.userId, auth.token.id)));

      if (!data || data.length === 0) {
        return c.json({ error: "[BOARD_GET] : Board not found" }, 400);
      }

      return c.json({ data: data[0] });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("param");

      const data = await db
        .delete(boards)
        .where(and(eq(boards.id, id), eq(boards.userId, auth.token.id)))
        .returning();

      if (!data || data.length === 0) {
        return c.json(
          { error: "[BOARD_DELETE] : Failed to delete board" },
          400
        );
      }

      return c.json({ data: id });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ title: z.string().min(3).max(25) })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("param");
      const { title } = c.req.valid("json");

      const data = await db
        .update(boards)
        .set({
          title: title,
        })
        .where(and(eq(boards.id, id), eq(boards.userId, auth.token.id)))
        .returning();

      if (!data || data.length === 0) {
        return c.json(
          { error: "[BOARD_UPDATE] : Failed to update board" },
          400
        );
      }

      return c.json({ data: { id: id } });
    }
  );

export default app;
