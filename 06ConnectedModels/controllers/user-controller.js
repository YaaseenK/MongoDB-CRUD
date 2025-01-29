const { isValidObjectId } = require('mongoose');

// Importing the User model from the models directory
const { User, Comment } = require('../models/index');

// Function to get all users from the database
const getUsers = async (req, res) => {
    try {
        // Fetching all users
        const users = await User.find({})
            .sort({ _id: -1 })
            .select('-__v');
        // Sending the users as a response with status 200 (OK)
        res.status(200).json(users);
    } catch (err) {
        // If an error occurs, send a 500 (Internal Server Error) response
        res.status(500).json({ message: err.message });
    }
};

// Function to find a user by ID
const findUser = async (req, res) => {
    const userId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid User ID formate' });
    }

    try {
        // Find the user by the valid ID
        const singleUser = await User.findOne({ _id: userId });

        // Check if no user is found
        if (!singleUser) {
            return res.status(404).json({ message: 'Error: No User With This ID' });
        }

        // Return the user data if found
        res.status(200).json(singleUser);
    } catch (err) {
        // Return a 500 status code for any unexpected errors
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        // Creating a new user with the data from the request body
        const user = await User.create(req.body);
        // Returning the created user as a JSON response with status 200 (OK)
        res.status(200).json(user);
    } catch (err) {
        // Handle duplicate key error (E11000) for name or any other unique index
        if (err.code === 11000) {
            return res.status(400).json({ message: `Error:  ${Object.keys(err.keyValue)[0]} already exsits.` });
        }

        // Handle other potential errors
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Get the updated username and userId from the request body
        const { username } = req.body;

        // Use findOneAndUpdate to update the user with the provided ID and request body
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.id }, // The condition to match the user by ID
            req.body, // The data to update the user with
            {
                new: true, // Return the updated user
                runValidators: true // Ensure validators are run before update
            }
        );

        // If no user is found, return a 404 (Not Found) status
        if (!dbUserData) {
            return res.status(404).json({ message: 'No User Found With that ID' });
        }

        // If the username is changed, update all related comments
        if (username) {
            // Get all the comment IDs associated with the user
            const commentIds = dbUserData.comments; 

            // Update the username in each comment
            await Comment.updateMany(
                { _id: { $in: commentIds } }, // Match comments whose IDs are in the array
                { $set: { username: username } } // Set the new username in the comments
            );
        }

        // Return the updated user data as JSON
        res.json(dbUserData);
    } catch (err) {
        // Handle duplicate key error (E11000) for username or email conflict
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'Username or email taken',
                error: err.keyValue // This will show the field that caused the conflict
            });
        }

        // Return a 400 status for any other errors
        res.status(400).json({ message: err.message });
    }
};


// Function to delete a user by their ID
const userDelete = async (req, res) => {
    const userId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid search' });
    }

    try {
        // Using findOneAndDelete to remove a user by their ID
        const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
        // If no user is found, return a 404 (Not Found) status
        if (!deleteUser) {
            return res.status(404).json({ message: 'No User Found!' });
        }
        // Return a success message with status 200 (OK) if user is deleted
        res.json({ message: 'Success! User deleted successfully' });
    } catch (err) {
        // If an error occurs, return a 500 (Internal Server Error) status with the error message
        res.status(500).json({ message: 'An error occurred while deleting the User', err: err.message });
    }
};

// Function to find a user by Email
const findUserByEmail = async (req, res) => {
    const { email } = req.params;

    // Basic validation for email format using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Fetch the user by EMAIL
        const user = await User.findOne({ email: email })
            .select('username email comment -_id');  // Excluding _id field

        if (!user) {
            return res.status(404).json({ message: 'No User found with this email' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

// Exporting all functions so they can be used in the router
module.exports = {
    createUser,
    getUsers,
    findUser,
    updateUser,
    userDelete,
    findUserByEmail
};
