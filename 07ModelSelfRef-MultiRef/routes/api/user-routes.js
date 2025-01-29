const router = require('express').Router();
const { 
        getUsers, getUserById, 
        createUser, updateUser, 
        deleteUser,
        borrowBook,
        returnBook
    } = require('../../controllers/user-controller');

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:id/borrows/:bookId')
    .put(borrowBook)
    .delete(returnBook)


module.exports = router;