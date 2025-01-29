const { Schema, Types, model } = require('mongoose');

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Role: [{
        type: String,
        role: { 
            type: String, 
            enum: ['member', 'admin'], 
            default: 'member' 
        },
    }],
    BorrowedBooks:[{
        type: Types.ObjectId,
        ref: 'Lone'
    }],
    Reviews:[{
        type: Types.ObjectId,
        ref: 'Review'
    }],
    Friends: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
},
    {
        toJSON:{
            virtuals: true,
        },
        id:false,
    }
);

const User = model('User', UserSchema);

module.exports = User;