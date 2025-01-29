const { Schema, Types, model } = require('mongoose');

const LoanSchema = new Schema({
    user: {
        type: Types.ObjectId, 
        ref: 'User',
        required: true},
    book: {
        type:Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedDate:{
        type: Date,
        default: Date.now
    },
    dueDate:{
        type: Date,
        required: true
    },
    returnDate:{
        type: Date,
    },
    status:{
        type: String,
        enum: ['borrowed', 'returned'],
        default: 'borrowed',
    },
},
    {timestamps:true}
);

module.exports = model('Loan', LoanSchema);