import { Router } from "express";
import { specs, swaggerUi } from "../../swagger";
import { isProduction } from "../utils/constant";
const router = Router();

if (!isProduction) {
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
}

router.get("/", (req, res) => {
  res.send("Welcome to Quran API");
});

export default router;
