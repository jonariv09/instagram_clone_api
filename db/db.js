require('dotenv').config()
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
let Connection = null

const { DB_USER, DB_PASS, DB_URI } = process.env

async function connection() {
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

module.exports = { connection, ObjectId }
