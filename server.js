const express = require('express')
const dotenv = require('dotenv')
const app = express()
const morgan = require('morgan')
const connectDB = require('./config/db')

// routes
const bootcamps = require('./routes/bootcamps')

//env variables
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

//connect to database
connectDB()

//dev logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//mount routes
app.use('/api/v1/bootcamps', bootcamps)

const server = app.listen(
  PORT,
  console.log(
    `REST API running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

//Handle unhandled rejection
process.on('unhandledRejection', (e, promise) => {
  console.log(`Error: ${e.message}`)
  // close the server exit process
  server.close(() => process.exit(1))
})
