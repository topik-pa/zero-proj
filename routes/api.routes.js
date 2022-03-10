module.exports = app => {
  const api = require('../controllers/api.controller.js')
  const router = require('express').Router()

  // GET
  router.get('/', api.get)

  app.use('/api', router)
}
