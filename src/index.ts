import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/v1";
import { Context, Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { socialMediaCntroller } from "./controller/socialMediaCntroller";
import { sendFile } from "./utils";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", routes);

//telegram bot
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  try {
    ctx.reply(
      `Hi ${ctx.message.from.first_name},\n\nI can Download Files from Terabox.\n\nMade with ❤️ by @rishi\n\nSend any facebook, instagram, youtube, terabox link to download.`,
      Markup.inlineKeyboard([
        Markup.button.url(" ower", "https://t.me/rishi171099"),
        Markup.button.url("Report bug", "https://t.me/Tamoghna17"),
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.on("message", async (ctx: Context) => {
  if (ctx.message && "text" in ctx.message) {
    console.log("ctx.message-->>", ctx.message);

    const messageText = ctx.message.text;
    console.log("messageText-->>", messageText);
    await ctx.reply("Processing... Please wait.");
    const details = await socialMediaCntroller(messageText);
    console.log("details", JSON.stringify(details, null, 2));

    try {
      ctx.reply(`Sending Files Please Wait.!!`);
      sendFile(details, ctx);
    } catch (e) {
      console.error(e);
    }
  } else {
    ctx.reply("No message text found.");
  }
});

bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
//end

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
