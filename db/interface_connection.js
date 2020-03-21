const { connection } = require('./db')
let dbo = null

connection()
  .then(data => {
      dbo = data
    })

async function validateAuthentication(user_name, pass) {
  let result = null
  result = await dbo.collection('Users')
    .find(
      { user_name: { $eq: user_name }, password: { $eq: pass } },
      { user_name: true, password: true })
    .toArray()
    .then(userFound => {
      if(userFound)
        return userFound
    })

  return result
}

module.exports = {
  validateAuthentication
}
