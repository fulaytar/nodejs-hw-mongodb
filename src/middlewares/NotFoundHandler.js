const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
  next();
};

export default notFoundHandler;
