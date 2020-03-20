const { connection } = require('./db')
let dbo = null

connection()
  .then(data => {
      dbo = data
    })

function validateAuthentication(user_name, pass) {
  let result = dbo.collection('Users').find({ user_name: { $eq: user_name }, password: { $eq: pass } })
  console.log(result)
}

module.exports = {
  validateAuthentication
}
