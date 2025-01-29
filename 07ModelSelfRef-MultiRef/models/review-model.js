const {Schema, Types, model} = require('mongoose');

const ReviewSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    rating:{
        type:Number, min: 1, max: 5, required: true
    },
    comment: { type: String }
}, {timestamps: true});

const Review = model('Review', ReviewSchema);

module.exports = Review;