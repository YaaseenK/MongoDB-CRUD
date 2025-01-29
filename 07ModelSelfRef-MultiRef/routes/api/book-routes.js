const router = require('express').Router();

const {
    getBooks,
    createBook
} = require('../../controllers/book-controller');

router.route('/')
    .get(getBooks)
    .post(createBook)

module.exports = router;