const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('response from login')
})

module.exports = router
