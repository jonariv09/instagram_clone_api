// here will be all related to [db connection]

const User = require('./model')
const { connection } = require('../../db/db')
let dbo = null

connection()
  .then(data => {
    dbo = data
  })

async function addUser (user) {

  let userObject = {
    name: user.name,
    user_name: user.user_name,
    email: user.email,
    password: user.password
  }

  const newUser = new User(userObject)
  await dbo.collection('Users').insertOne(newUser)
}

module.exports = {
  add: addUser
}
