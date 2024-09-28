import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

/* Major Project API Routes */
import users from "./users";
import board from "./board";
/* Major Project API Routes */

const app = new Hono().basePath("/api");

const routes = app.route("/users", users).route("/board", board);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
