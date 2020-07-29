require('dotenv').config()
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
let Connection = null
let number = 0

const { DB_USER, DB_PASS, DB_URI } = process.env

class DBConnection {
  static connection = null

  static async createConnection() {
    mongoose.Promise = global.Promise
    Connection = await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'instagram_clone',
      },
      function (err, db) {
        if (err) {
          throw err
        } else {
          console.log('[db] Database connected')
          return db
        }
      }
    )

    return Connection.connections[0]
  }

  static setInstance(conn) {
    this.connection = conn
  }

  static getInstance() {
    return this.connection
  }

  static closeConnection() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination')
      process.exit(0)
    })
  }
}

module.exports = { DBConnection, ObjectId }
