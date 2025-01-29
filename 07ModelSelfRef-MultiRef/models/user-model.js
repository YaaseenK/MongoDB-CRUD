const { Schema, Types, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member',
    },
    borrowedBooks: [{
        type: Types.ObjectId,
        ref: 'Loan'  // Fixed typo from "Lone" to "Loan"
    }],
    reviews: [{
        type: Types.ObjectId,
        ref: 'Review'
    }],
    friends: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

const User = model('User', UserSchema);

module.exports = User;
