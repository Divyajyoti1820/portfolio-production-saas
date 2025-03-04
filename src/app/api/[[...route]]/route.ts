/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

/* Major Routes */
import users from "@/features/auth/server/route";
import boards from "@/features/boards/server/route";
import columns from "@/features/columns/server/route";
import tasks from "@/features/tasks/server/route";
/* Major Routes */

export const runtime = "nodejs";

/* Next-Auth Config */
function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}
/* Next-Auth Config */

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/users", users)
  .route("/boards", boards)
  .route("/columns", columns)
  .route("/tasks", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
