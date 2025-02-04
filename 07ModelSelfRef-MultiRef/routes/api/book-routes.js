const router = require('express').Router();

const {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook
} = require('../../controllers/book-controller');

router.route('/')
    .get(getBooks)
    .post(createBook)

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

module.exports = router;