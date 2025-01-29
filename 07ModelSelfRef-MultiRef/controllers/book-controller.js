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
    try {  const book = await Book.create(req.body);
            res.status(200).json({ book });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: `Error: ${Object.keys(err.keyValue)[0]} already exists.` });
            }
            res.status(500).json({ message: err.message });
        }
    }
};