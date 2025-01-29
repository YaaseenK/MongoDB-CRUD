const { isValidObjectId } = require('mongoose');
const { User, Book } = require('../models/model-index');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({})
                .sort({ _id: 1 }) // Sort the users by their _id in ascending order
                .select('-__v -id')// Exclude the '__v' and 'id' fields from the query results
            res.status(200).json({ users })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    async getUserById(req, res) {
        const userId = req.params.id;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invaild User Id' })
        }

        try {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' })
            }
            res.status(201).json({ user })
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: `Error: ${Object.keys(err.keyValue)[0]} already exists.` })
            }
            res.status(500).json({ message: err.message })
        }
    },

    async updateUser(req, res) {
        try {
            const { username } = req.body;
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with that ID' })
            }
            res.status(200).json({ userData })
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    message: 'Username or email taken',
                    error: err.keyValue // This will show the field that caused the conflict
                });
            }
            res.status(500).json({ message: err.message })
        }
    },

    async deleteUser(req, res) {
        const userId = req.params.id;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        try {
            const deleteUser = await User.findOneAndDelete({ _id: userId })
            if (!deleteUser) {
                return res.status(404).json({ message: 'No user found with that ID' })
            }
            res.status(200).json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async borrowBook({ params }, res) {
        try {
            const UserID = params.id;
            const BookID = params.bookId;
            const { availableCopies, title } = await Book.findById(BookID);
            const { borrowedBooks } = await User.findById(UserID);
            const isDifBook = BookID !== borrowedBooks.toString();
            const isAvailable = availableCopies > 0;
            if (isAvailable && isDifBook) {
                const book = await Book.findByIdAndUpdate(BookID,
                    {
                        $addToSet: { borrower: UserID },
                        $inc: { availableCopies: -1 }
                    },
                    { new: true }
                );
                const user = await User.findByIdAndUpdate(UserID,
                    { $addToSet: { borrowedBooks: book } },
                    { new: true }
                );

                // Send a success response
                res.status(200).json({
                    message: `${title} successfully borrowed!`,
                });
            } else {
                res.status(400).json({ message: "Error: Unable to borrow book" })
            }


        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    },

    async returnBook(req, res) {
        try {
            const UserID = req.params.id;
            const BookID = req.params.bookId;
            const { borrower, title } = await Book.findById(BookID);

            const isNotBorrowed = UserID == borrower.toString()

            if(isNotBorrowed){
                const book = await Book.findByIdAndUpdate(
                    BookID,
                    {
                        $pull: { borrower: UserID },
                        $inc: { availableCopies: 1 }
                    },
                    { new: true }
                )
                const user = await User.findByIdAndUpdate(
                    UserID,
                    { $pull: { borrowedBooks: BookID } },
                    { new: true },
                )
                res.status(200).json({ message: `${title} returned`})
            }
            else{
                res.status(500).json({message: 'Please Sign Book Out First'})
            }

        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    }
}