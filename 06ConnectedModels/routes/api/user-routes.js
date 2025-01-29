// Importing express router
const router = require('express').Router();

// Importing controller functions for user operations
const {
    createUser, // Function to handle user creation
    getUsers,   // Function to retrieve all users
    findUser,   // Function to find a user by ID
    updateUser, // Function to update a user by ID
    userDelete,  // Function to delete a user by ID
    findUserByEmail
} = require("../../controllers/user-controller");

// Route for handling requests to the root path ("/") of the user routes
router.route('/')
    // GET request to retrieve all users
    .get(getUsers)
    // POST request to create a new user
    .post(createUser);

// Route for handling requests to "/:id", where ":id" is the unique identifier of a user
router.route('/:id')
    // GET request to retrieve a specific user by their ID
    .get(findUser)
    // PUT request to update a specific user by their ID
    .put(updateUser)
    // DELETE request to delete a specific user by their ID
    .delete(userDelete);

    // GET request to retrieve a spacific user by their Email
router.route('/email/:email')
    .get(findUserByEmail)

// Exporting the router so it can be used in other parts of the application
module.exports = router;