const { isValidObjectId } = require('mongoose');
const User = require('../models/user-model');

module.exports = {
    async getUsers(req, res) {  
        try {
            const users = await User.find({})
            .sort({ _id: 1}) // Sort the users by their _id in ascending order
            .select('-__v -id')// Exclude the '__v' and 'id' fields from the query results
        res.status(200).json({ users})
        } catch (err) {
            res.status(500).json({ message: err.message})
        }
    },

    async getUserById(req, res) {
        const userId = req.params.id;

        if (!isValidObjectId(userId)){
            return res.status(400).json({ message: 'Invaild User Id'})
        }

        try{
            const user = await User.findOne({ _id: userId});
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'})
            }
            res.status(200).json({ user })
        }
        catch{
            (err) => {
                res.status(500).json({ message: err.message})
            }
        }
    }
}