const { Schema, Types, model } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    description: {
        type: String,
    },
    publicationYear: {
        type: Number,
    },
    ISBN: {
        type: String,
    },
    borrower: {
        type: Types.ObjectId,
        ref: 'User',
    },
    availableCopies:{
        type: Number,
        default: 1,
    },
    totalCopies:{
        type: Number,
        default: 1,
    },
    reviews: [{
        type: Types.ObjectId,
        ref: 'Review',
    }],

},{ timestamps:true });

const Book = model('Book', BookSchema);

module.exports = Book; 