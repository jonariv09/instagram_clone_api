const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  name: String,
  user_name: String,
  email: String
  // gender: String,
  // password: String,
  // phone_number: String,
  // web_site: String,
  // presentation: String,
  // picture: String
})

const model = mongoose.model('User', mySchema)
module.exports = model
