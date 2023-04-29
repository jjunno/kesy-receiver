const errorHandler = (error, request, response, next) => {
  const status = 500;
  const message = 'Internal Server Error';
  console.log(message);
  response.status(status).json({ message });
};

module.exports = {
  errorHandler,
};
