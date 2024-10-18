import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

import bcrypt from "bcryptjs";

const app = new Hono();

export default app;
