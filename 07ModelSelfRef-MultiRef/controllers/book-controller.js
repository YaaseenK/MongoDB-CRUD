const { Book } = require('../models/model-index');
const { isValidObjectId } = require('mongoose');

module.exports = { 
    async getBooks (req, res) {
        try {
            const books = await Book.find({})
            .select('-__v');
            res.status(200).json({ books });
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getBookById(req, res){
        const bookId = req.params.id;
        if(!isValidObjectId){
            return res.status(400).json({ message: 'Invalid Book ID'})
        }
        try {
            const book = await Book.findOne( {_id: bookId});
            if (!book){
                return res.status(404).json({ message: 'No book found with that ID'});
            }
            res.status(200).json({ book });
            } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async createBook (req, res) {
        const availableCopies =  req.body.availableCopies
        const totalCopies =  req.body.totalCopies
        const checkBook = await Book.findOne({ 
            title: req.body.title, 
            author: req.body.author,
        });
    try {  
        if (checkBook) {
            return res.status(400).json({ message: 'A book with this title and author already exists' });
        }

        if (availableCopies > totalCopies) {
            return res.status(400).json({ message: 'Available copies cannot be more than total copies' });
        }

        const book = await Book.create(req.body);
            res.status(200).json({ book });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: `Error: ${Object.keys(err.keyValue)[0]} already exists.` });
            }
            res.status(500).json({ message: err.message });
        }
    },
    
    async updateBook(req, res) {
        try {
            // Extract the book ID from the request parameters
            const bookId = req.params.id;
            // Extract values we want to validate before updating
            // Destructure the title, authors, availableCopies, and totalCopies from the request body
            const { title, authors, availableCopies, totalCopies } = req.body;
    
            // Find the existing book by ID
            const book = await Book.findById(bookId);
            // If no book is found, return a 404 error
            if (!book) {
                return res.status(404).json({ message: 'No book found with that ID' });
            }
    
            // Check if the title or author is being changed
            // isTitleChanged will be true if title is provided and it is different from the existing title
            /* 
                isTitleChanged will Only hold a value if title is provided and it is different from the existing title
                isTitleChanged will check if title is provided? AND it is different from the existing title.  
                isAuthorChanged will be true if authors is provided and it is different from the existing authors
                We use authors.toString() to compare the arrays as they are objects and cannot be compared directly            
            */
            const isTitleChanged = title && title !== book.title;
            const isAuthorChanged = authors && authors.toString() !== book.authors.toString();

            // If the title or author is changed, check if a book with the same title and author already exists
            if (isTitleChanged || isAuthorChanged) {
                // Check if a book with the same title and author already exists
                const existingBook = await Book.findOne({ title, authors });
                // If a book with the same title and author already exists, return a 400 error
                if (existingBook) {
                    return res.status(400).json({ message: 'A book with this title and author already exists' });
                }
            }
    
            // Ensure availableCopies is not more than totalCopies
            if (availableCopies > totalCopies) {
                return res.status(400).json({ message: 'Available copies cannot be more than total copies' });
            }
    
            // Update the book
            const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { 
                new: true, 
                runValidators: true 
            });
    
            res.status(200).json({ book: updatedBook });
    
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    

    async deleteBook (req, res) {
        try {
            const book = await Book.findOneAndDelete({ _id: req.params.id });
            if (!book) {
                return res.status(404).json({ message: 'No book found with that ID' });
            }
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

};