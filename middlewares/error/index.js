export const serverErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message,
  });
};

export const notFoundHandler = (err, req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    error: err.message,
  });
};
