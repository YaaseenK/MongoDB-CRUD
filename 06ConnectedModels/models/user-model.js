const {Schema, model, Types} = require('mongoose');

// Define a schema for the 'User' collection in MongoDB
const userSchema = Schema({
    // 'name' field: Represents the user's name
    username: {
        type: String,        // Data type is String
        unique: true,        // Ensures no two users have the same name
        required: true       // This field is mandatory
    },
    // 'password' field: Represents the user's password
    password: {
        type: String,        // Data type is String
        required: true       // This field is mandatory
    },
    // 'email' field: Represents the user's email address
    email: {
        type: String,        // Data type is String
        unique: true,        // Ensures no two users have the same email
        required: true,      // This field is mandatory
        match: [             // Validates the email format using a regex pattern
            /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,3})$/
        ]
    },
    // 'comments' field: Represents an array of comments associated with the user
    comments: [
        {
            type: Schema.Types.ObjectId, // References the 'Comment' model
            ref: 'comment'                        // Establishes a relationship with the 'Comment' collection
        }
    ]
},
    // Schema options
    {
        toJSON: {
            virtuals: true,  // Ensures virtual fields are included when converting to JSON
        },
        id: false,           // Disables the default '_id' field in the JSON output
    }
);

const User = model('User', userSchema) 

// Export the schema as a Mongoose model named 'User'
module.exports = User;