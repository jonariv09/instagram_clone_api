require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const expressSession = require('express-session')

// express-session mongoose
const expressValidator = require('express-validator')
const MongoStore = require('connect-mongo')(expressSession)


const jwt = require('jsonwebtoken')

const routes = require('./network/routes')

const app = express()

const {
  SESSION_KEY,
  PORT
} = process.env

app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(expressSession({
  secret: SESSION_KEY,
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


// jsonwebtoken authentication
routes(app, jwt)


// Error management
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : { }

  // render the error page
  res.status(err.status || 500)
})


// Server set up
app.listen(app.get('port'), () => {
  console.log(`Server runing on port ${app.get('port')}`)
})