const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        name:{ type: String, required: true},
        price: Number,
        quantity: Number,
        inStock: Boolean,
    },
    {timeStamps: true}
);

const Product = mongoose.model('product', ProductSchema);

module.exports = Product