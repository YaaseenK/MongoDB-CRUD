const router = require('express').Router();
const {
    getUsers,
    getUserById
} = require('../../controllers/user-controller');


router.route('/')
    .get(getUsers);

router.route('/:id')
    .get(getUserById)

module.exports = router;