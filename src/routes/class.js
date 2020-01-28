const express = require('express')
const controller = require('../controllers/class')
const router = express.Router()
const authentication = require('passport').authenticate('jwt', { session: false })

router.post('/', authentication, controller.create)
router.get('/', authentication, controller.getAll)
router.get('/:id', authentication, controller.getById)
router.patch('/:id', authentication, controller.update)
router.delete('/:id', authentication, controller.delete)

module.exports = router