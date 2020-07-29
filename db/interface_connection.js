const { DBConnection } = require('./db')
let dbo = null

DBConnection.createConnection().then((conn) => DBConnection.setInstance(conn))

async function validateAuthentication(user_name, pass) {
  let result = null
  result = await DBConnection.getInstance()
    .collection('users')
    .find(
      { user_name: { $eq: user_name }, password: { $eq: pass } },
      { user_name: true, password: true }
    )
    .toArray()
    .then((userFound) => {
      if (userFound) return userFound
    })

  return result
}

module.exports = {
  validateAuthentication,
}
