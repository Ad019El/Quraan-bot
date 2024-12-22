import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { isProduction } from "./server/utils/constant";
dotenv.config();
import { specs, swaggerUi } from "./swagger";
import { errorHandler } from "./server/middleware/error.handling.middleware";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(isProduction ? morgan("combined") : morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Handling Middleware
app.use(errorHandler)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
