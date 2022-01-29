const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (error, req, res, next) => {
  let e = { ...error }

  console.log(error.stack.red)

  //mongoose bad objectid error
  if (error.name === 'CastError') {
    const message = `Resource not found with id of ${error.value}`
    e = new ErrorResponse(message, 404)
  }

  //mongoose duplicate keys error
  if (error.code === 11000) {
    const message = `Duplicate field value entered`
    e = new ErrorResponse(message, 400)
  }

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((value) => value.message)
    e = new ErrorResponse(message, 400)
  }

  res.status(e.statusCode || 500).json({
    success: false,
    error: e.message || 'Server Error',
  })
}

module.exports = errorHandler
