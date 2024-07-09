import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/v1";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});