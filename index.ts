import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { isProduction } from "./server/utils/constant";
import { errorHandler } from "./server/middleware/error.handling.middleware";
import { connectMongoDB } from "./server/config/db";
import mainRoutes from "./server/routes/index";
import { messages } from "./server/bot/utils/messages.utils";
import './server/bot';
import './server/utils/cron.job'

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(process.env.NODE_ENV === 'production' ? morgan("combined") : morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Handling Middleware
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send(messages.welcome);
});
app.use("/api/v1", mainRoutes);

connectMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
});
