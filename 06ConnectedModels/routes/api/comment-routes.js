const router = require('express').Router();

const {
    getComments,
    createComment,
    updateComment,
    deleteComment

} = require ('../../controllers/comment-controller');

router.route('/')
    .get(getComments)
    .post(createComment)

router.route('/:id')
    .put(updateComment)
    .delete(deleteComment)

module.exports = router