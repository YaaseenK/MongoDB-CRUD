// Import the Express Router to create modular route handlers
const router = require('express').Router();

// Import the user routes from the './user-routes' file
const userRoute = require('./user-routes');
const commentRoute = require('./comment-routes');

// Use the user routes for any request starting with '/users'
router.use('/users', userRoute);
// Use the user routes for any request starting with '/comments'
router.use('/comments', commentRoute);

// Export the router so it can be used in other parts of the application
module.exports = router;