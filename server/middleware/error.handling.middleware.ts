import { validationResult } from "express-validator";
import { isProduction } from "../utils/constant";
import { NextFunction, Request, Response, Errback } from "express";
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);
  res.status(500).json({
    status: "error",
    message: "Ooops! Something went wrong.",
    error: err.message,
  });
  next();
};
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (isProduction) {
      return next({ message: "Validation Error" });
    }
    return res.status(400).json({ errors: errors.array() });
  }
};

export  { errorHandler, handleValidationErrors };
