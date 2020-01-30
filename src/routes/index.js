const router = require('express').Router();

router.use('/auth', require('./entityRoutes/auth'));
router.use('/lesson', require('./entityRoutes/lesson'));
router.use('/auditorium', require('./entityRoutes/auditorium'));
router.use('/class', require('./entityRoutes/class'));
router.use('/user', require('./entityRoutes/user'));

module.exports = router;