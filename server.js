//env variables
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const express = require('express')
const app = express()
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

// routes
const bootcamps = require('./routes/bootcamps')

//middleware
app.use(express.json())

const PORT = process.env.PORT || 5000

//connect to database
connectDB()

//dev logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//mount routes
app.use('/api/v1/bootcamps', bootcamps)
//error handler
app.use(errorHandler)

const server = app.listen(
  PORT,
  console.log(
    `REST API running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)

//Handle unhandled rejection
process.on('unhandledRejection', (e, promise) => {
  console.log(`Error: ${e.message}`.red)
  // close the server exit process
  server.close(() => process.exit(1))
})
