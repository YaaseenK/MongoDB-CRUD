const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: String,
    stockCount: Number,
    price: Number,
    inStock: Boolean,
    lastAccessed: {type: Date, Default: Date.now},
});

const Book = mongoose.model('Book', bookSchema);

Book.create(
    {
        title: 'harry potter',
        author: 'jk rowling',
        price: 12
    }
)
module.exports = Book;
