import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import z from "zod";

import { boards, columns, tasks } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { db } from "@/db";
import { and, desc, eq } from "drizzle-orm";

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

      const highestPositionTask = await db
        .select()
        .from(tasks)
        .orderBy(desc(tasks.position))
        .limit(1);

      const newPosition =
        highestPositionTask.length > 0
          ? highestPositionTask[0].position + 1
          : 1;

      const data = await db
        .insert(tasks)
        .values({
          title,
          description,
          columnId,
          subtasks,
          position: newPosition,
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
        .where(eq(tasks.columnId, columnId))
        .orderBy(desc(tasks.position));

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
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ boardId: z.string(), columnId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { id } = c.req.valid("param");
      const { boardId, columnId } = c.req.valid("json");

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

      return c.json({ data: data[0] });
    }
  )
  .patch(
    "/:columnId/:id",
    verifyAuth(),
    zValidator("param", z.object({ columnId: z.string(), id: z.string() })),
    zValidator(
      "json",
      z.object({
        boardId: z.string(),
        newColumnId: z.string(),
        title: z.string().min(3),
        description: z.string(),
        subtasks: z.array(
          z.object({ title: z.string(), isCompleted: z.boolean() })
        ),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { columnId, id } = c.req.valid("param");

      const { boardId, newColumnId, title, description, subtasks } =
        c.req.valid("json");

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

      const newColumn = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, newColumnId)));
      if (!newColumn || newColumn.length === 0) {
        return c.json({ error: "[TASK_GET] : Column not found" }, 400);
      }

      const task = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.columnId, columnId), eq(tasks.id, id)));

      if (!task || task.length === 0) {
        return c.json({ error: "Failed to fetch task" }, 400);
      }

      const data = await db
        .update(tasks)
        .set({
          title,
          description,
          columnId: newColumnId,
          subtasks,
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, id))
        .returning();

      if (!data || data.length === 0) {
        return c.json({ error: "Failed to update board" }, 400);
      }

      return c.json({ data: data[0] });
    }
  )
  .patch(
    "subtasks/:columnId/:id",
    verifyAuth(),
    zValidator("param", z.object({ columnId: z.string(), id: z.string() })),
    zValidator(
      "json",
      z.object({
        boardId: z.string(),
        subtasks: z.array(
          z.object({ title: z.string(), isCompleted: z.boolean() })
        ),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { columnId, id } = c.req.valid("param");

      const { boardId, subtasks } = c.req.valid("json");

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[TASK_UPDATE] : Board not found" }, 400);
      }

      const column = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));

      if (!column || column.length === 0) {
        return c.json({ error: "[TASK_UPDATE] : Column not found" }, 400);
      }

      const task = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.columnId, columnId), eq(tasks.id, id)));

      if (!task || task.length === 0) {
        return c.json({ error: "[TASK_UPDATE] : Failed to fetch task" }, 400);
      }

      const data = await db
        .update(tasks)
        .set({
          subtasks,
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, id))
        .returning();

      if (!data || data.length === 0) {
        return c.json({ error: "[TASK_UPDATE] : Failed to update task" }, 400);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/copy/:columnId/:id",
    verifyAuth(),
    zValidator("param", z.object({ columnId: z.string(), id: z.string() })),
    zValidator("json", z.object({ boardId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { columnId, id } = c.req.valid("param");

      const { boardId } = c.req.valid("json");
      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "[TASK_COPY] : Board not found" }, 400);
      }

      const column = await db
        .select({ id: columns.id })
        .from(columns)
        .where(and(eq(columns.boardId, boardId), eq(columns.id, columnId)));
      if (!column || column.length === 0) {
        return c.json({ error: "[TASK_COPY] : Column not found" }, 400);
      }

      const task = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.columnId, columnId), eq(tasks.id, id)));
      if (!task || task.length === 0) {
        return c.json({ error: "[TASK_COPY] : Failed to fetch task" }, 400);
      }

      const { title, description, columnId: copyColumnId, subtasks } = task[0];

      const highestPositionTask = await db
        .select()
        .from(tasks)
        .orderBy(desc(tasks.position))
        .limit(1);

      const newPosition =
        highestPositionTask.length > 0
          ? highestPositionTask[0].position + 1
          : 1;

      const data = await db
        .insert(tasks)
        .values({
          title: `${title}-copy`,
          description,
          columnId: copyColumnId,
          subtasks,
          position: newPosition,
        })
        .returning();

      if (!data || data.length === 0) {
        return c.json({ error: "[TASK_COPY] : Failed to copy data" }, 400);
      }

      return c.json({ data: data[0] });
    }
  )
  .patch(
    "/bulk-update-tasks",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        boardId: z.string(),
        tasks: z.array(
          z.object({
            id: z.string(),
            columnId: z.string(),
            position: z.number().min(0).max(10),
          })
        ),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Un-Authorized Access" }, 401);
      }

      const { boardId, tasks: updatedTasks } = c.req.valid("json");

      if (!boardId || !updatedTasks) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      const board = await db
        .select({ id: boards.id })
        .from(boards)
        .where(and(eq(boards.id, boardId), eq(boards.userId, auth.token.id)));
      if (!board || board.length === 0) {
        return c.json({ error: "Board not found" }, 400);
      }

      const updateTasks = await Promise.all(
        updatedTasks.map(async (task) => {
          const { id, columnId, position } = task;
          const data = await db
            .update(tasks)
            .set({
              columnId,
              position,
            })
            .where(eq(tasks.id, id))
            .returning({ id: tasks.id });

          return data[0];
        })
      );

      if (!updateTasks || updateTasks.length === 0) {
        return c.json("Failed to update tasks", 400);
      }

      return c.json({ data: updateTasks });
    }
  );

export default app;
