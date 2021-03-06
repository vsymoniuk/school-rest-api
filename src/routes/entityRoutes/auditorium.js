const express = require('express');
const authentication = require('passport').authenticate('jwt', { session: false });
const controller = require('../../controllers/auditorium');
const router = express.Router();

router.post('/', authentication, controller.create);
router.get('/', authentication, controller.getAll);
router.get('/:id', authentication, controller.getById);
router.patch('/:id', authentication, controller.update);
router.delete('/:id', authentication, controller.delete);

module.exports = router;