import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.json({ users: [] });
});

export default app;
