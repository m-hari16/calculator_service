import { JsonWebTokenError } from "jsonwebtoken";
import unauthenticated from "../exception/unauthenticated";
import { NextFunction, Request, Response } from "express";


export default function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof unauthenticated || err instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: err.message
    })
  }

  return res.status(500).json({
    success: false,
    message: 'internal server'
  })
}