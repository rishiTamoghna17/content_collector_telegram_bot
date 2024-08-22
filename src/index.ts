import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { Context, Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { sendFile } from "./utils";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { initializeSentry } from "./config/sentry";
initializeSentry(process.env.DNS || "");

import express, { Express, Request, Response } from "express";
import { launchBot } from "./bot/bot";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Sentry.setupExpressErrorHandler(app);

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
// Launch Telegram bot
launchBot();