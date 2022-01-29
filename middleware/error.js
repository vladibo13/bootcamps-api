const errorHandler = (e, req, res, next) => {
  console.log(e.stack.red)

  res.status(500).json({
    success: false,
    error: e.message,
  })
}

module.exports = errorHandler
