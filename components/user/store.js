// here will be all related to [db connection]

const User = require('./model')
const { DBConnection } = require('../../db/db')
let dbo = null

async function addUser(user) {
  let userObject = {
    name: user.name,
    user_name: user.user_name,
    email: user.email,
    password: user.password,
  }

  const newUser = new User(userObject)
  await DBConnection.getInstance().collection('users').insertOne(newUser)
}

function listUsers() {
  return DBConnection.getInstance()
    .collection('users')
    .find()
    .toArray()
    .then((data) => {
      if (data) return data
    })
}

module.exports = {
  add: addUser,
  list: listUsers,
}
