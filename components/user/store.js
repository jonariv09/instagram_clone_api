// here will be all related to [db connection]

const User = require('./model')
const { connection } = require('../../db/db')
let dbo = null

connection()
  .then(data => {
    dbo = data
  })
  .catch(error => {
    console.log('[db] There was a error in database connection')
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

function listUsers() {
  return dbo.collection('Users')
    .find()
    .toArray()
    .then(data => {
      if(data)
        return data
    })
}

module.exports = {
  add: addUser,
  list: listUsers
}
