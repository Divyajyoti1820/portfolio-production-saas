/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

/* Major Routes */
import users from "./users";
import boards from "./boards";
import columns from "./columns";
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
  .route("/columns", columns);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
