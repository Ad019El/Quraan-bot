import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { ENVIREMENT } from "./server/utils/constant";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(ENVIREMENT === "development" ? morgan("dev") : morgan("combined"));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
