module.exports = app => {
  // Catch 404 and forward to the error handler.
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.code = 404;
    err.message = 'Not Found';
    next(err);
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = {
      title: err.title || 'Internal Server Error',
      description: err.description || err.error || err.message,
    };
    res.status(error.statusCode || 500).json(error);
  });
};
