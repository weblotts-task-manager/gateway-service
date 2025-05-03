import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(createHttpError(404, "Resource not found"));
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
};
