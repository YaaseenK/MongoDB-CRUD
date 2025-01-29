const { Book } = require('../models/model-index');

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
    }
};