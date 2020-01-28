const express = require('express')
const controller = require('../controllers/user')
const router = express.Router()
const authentication = require('passport').authenticate('jwt', { session: false })

router.get('/', authentication, controller.getAll)
router.delete('/:id', authentication, controller.delete)

module.exports = router