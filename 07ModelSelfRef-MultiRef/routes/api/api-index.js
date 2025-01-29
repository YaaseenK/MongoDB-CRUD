const router = require('express').Router();

const userRoute = require('./user-routes');
const bookRoute = require('./book-routes');

router.use('/users', userRoute);
router.use('/books', bookRoute);

module.exports = router;