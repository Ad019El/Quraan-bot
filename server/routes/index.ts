import { Router } from "express";
import { specs, swaggerUi } from "../../swagger";
const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
router.get("/", (req, res) => {
  res.send("Welcome to Express & TypeScript Server");
});

export default router;
