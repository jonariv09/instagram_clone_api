// here will be the api logic

const store = require('./store')

function addUser (user) {
  return new Promise((resolve, reject) => {
    if (!user) {
      console.error("[userController] There isn't user")
      reject('Data is incorrect')
      return false
    }

    store.add(user)
    resolve(user)
  })
}

module.exports = {
  addUser
}
