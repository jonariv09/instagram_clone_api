const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  local: {
    username: String,
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  phone_number: String,
  full_name: String,
  gender: String,
  web_site: String,
  presentation: String,
  picture: String,
})

const model = mongoose.model('User', mySchema)
module.exports = model
