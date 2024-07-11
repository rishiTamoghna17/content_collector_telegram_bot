import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/v1";
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);

//telegram bot
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const bot = new Telegraf(BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))

bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
//end

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});