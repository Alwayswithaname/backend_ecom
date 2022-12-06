const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ideaRoutes = require('./ideaRoutes');

router.use('/user', userRoutes);
router.use('/ideas', ideaRoutes);

module.exports = router;