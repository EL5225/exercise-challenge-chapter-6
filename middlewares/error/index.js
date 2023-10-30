import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const serverErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message,
  });
  next();
};

export const zodErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
      error: {
        name: `Invalid input on property ${err.issues[0].path[0]}`,
        detail: err.errors[0].message,
      },
    });
  }
  return next(err);
};

export const prismaErrorHandler = (err, req, res, next) => {
  const error = err.message.split("\n");

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
      error: error[error.length - 1],
    });
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
      error: error[error.length - 1],
    });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
      error: error[error.length - 1],
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      status: false,
      message: "Bad Request",
      error: error[error.length - 1],
    });
  }

  return next(err);
};

export const notFoundHandler = (err, req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    error: err.message,
  });
  next();
};
