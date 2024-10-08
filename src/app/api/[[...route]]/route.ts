import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

/* Major Project API Routes */
import users from "./users";
import boards from "./boards";
import tasks from "./tasks";
/* Major Project API Routes */

export const runtime = "nodejs";

const getAuthConfig = (c: Context): AuthConfig => {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
};

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/users", users)
  .route("/boards", boards)
  .route("/tasks", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
