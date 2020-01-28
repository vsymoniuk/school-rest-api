const express = require('express')
const controller = require('../controllers/lesson')
const router = express.Router()
const passport = require('passport')

router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

module.exports = router