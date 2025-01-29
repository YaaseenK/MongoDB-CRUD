const { Schema, Types, model } = require('mongoose');

const BookSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    Borrower: {
        type: Types.ObjectId,
        ref: 'User',
    },
});