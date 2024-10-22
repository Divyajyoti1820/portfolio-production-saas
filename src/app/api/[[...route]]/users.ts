import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import z from "zod";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { db } from "@/db";

const app = new Hono().post("/", async (c) => {
  return c.json({});
});

export default app;
