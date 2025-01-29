const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: Number,
    image: String,
    lastAccessed: {
        type: Date, Default: Date.now
    },
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;