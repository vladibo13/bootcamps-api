const express = require('express')
const dotenv = require('dotenv')
const app = express()
const morgan = require('morgan')

// routes
const bootcamps = require('./routes/bootcamps')

//env variables
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

//dev logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//mount routes
app.use('/api/v1/bootcamps', bootcamps)

app.listen(
  PORT,
  console.log(`REST API running in ${process.env.NODE_ENV} on port ${PORT}`)
)
