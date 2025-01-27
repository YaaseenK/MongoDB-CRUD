const mongoose = require ('mongoose');

const grocerySchema = new mongoose.Schema({
    // Add individual properties and their types 
    // setting required to true will disallow null Vals
    item: { type: String, required: true },
    stockCount: Number,
    price: Number,
    inStock: Boolean,
    // Use built in data method to get current data 
    lastAccessed: { type: Date, default: Date.now},
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const Item = mongoose.model('Item', grocerySchema);

// Error handler function to be called when an error occurs when trying to save a doctoument 
const handlError = (err) => console.error(err);

// Use model to create individual documents that have the properties defined in schema
Item.create(
    {
        item: 'banana',
        stockCount: 10,
        price: 1,
        inStock: true,
    },
    {
        item: 'milk',
        stockCount: 10,
        price: 1,
        inStock: true
    },
    // (err) => (err ? handlError(err) : console.log('Created new Document'))
);

module.exports = Item;