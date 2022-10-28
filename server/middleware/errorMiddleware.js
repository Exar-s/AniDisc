export const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  if (error.name === 'ValidationError') {
    statusCode = 400;
  }
  if (error.name === 'CastError') {
    statusCode = 400;
  }

  // console.log({
  //   statusCode,
  //   name: error.name,
  //   msg: error.message,
  // });

  res.status(statusCode).json({
    name: error.name,
    msg: error.message,
  });
};
