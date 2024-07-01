const errorHandler = (error, req, res, next) => {
  const { status = 500, message, errors } = error;

  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: errors || message,
  });
};

export default errorHandler;
