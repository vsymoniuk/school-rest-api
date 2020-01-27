const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()
const passport = require('passport')

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router