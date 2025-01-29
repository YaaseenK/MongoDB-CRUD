// Import Mongoose to define the schema and model
const {Schema, model, Types} = require('mongoose');

// Import a custom utility function to format dates
const formatDate = require('../utils/formateDate');

// Define the schema for the 'Comment' collection
const commentSchema = Schema({
    // 'commentText' field: Represents the text content of the comment
    commentText: {
        type: String,        // Data type is String
        required: true,      // This field is mandatory
        minlength: 1,        // Minimum length of 1 character
        maxlength: 280,      // Maximum length of 280 characters
    },
    // 'createdAt' field: Represents the timestamp when the comment was created
    createdAt: {
        type: Date,          // Data type is Date
        default: Date.now,   // Default value is the current date and time
        get: (createdAt) => formatDate(createdAt), // Use the custom `formatDate` function to format the date
    },
    // 'username' field: Represents the username of the comment author
    username: {
        type: String,        // Data type is String
        required: true,      // This field is mandatory
    },
}, {
    // Schema options
    toJSON: {
        virtuals: true,      // Include virtual fields in the JSON output
        getters: true,       // Include getters (like the `formatDate` getter) in the JSON output
    },
    id: false,               // Disable the default `id` field in the JSON output
});

// Create the Mongoose model for the 'Comment' collection
const Comment = model('Comment', commentSchema);

// Export the 'Comment' model to be used in other parts of the application
module.exports = Comment;