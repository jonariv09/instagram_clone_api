require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const MongoStore = require('connect-mongo')(expressSession)
const jwt = require('jsonwebtoken')

const uuid = require('uuid/v4')
const redis = require('redis')
const redisStore = require('connect-redis')(expressSession)

const redisClient = redis.createClient()

redisClient.on('error', (err) => {
  console.log('Redis error: ', err)
})

const routes = require('./network/routes')

const app = express()

const {
  PORT,
  SESSION_KEY,
} = process.env

app.set('port', PORT)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(expressSession({
//   secret: SESSION_KEY,
//   saveUninitialized: true,
//   resave: true,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))

app.use(expressSession({
  genid: (req) => {
    return uuid()
  },
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  name: '_instagramAPI',
  secret: SESSION_KEY,
  resave: true,
  cookie: { secure: false, maxAge: 60000 },
  saveUninitialized: true
}))

routes(app, jwt)

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


app.listen(app.get('port'), () => {
  console.log(`Server runing on port ${app.get('port')}`)
})