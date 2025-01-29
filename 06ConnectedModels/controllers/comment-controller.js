const { isValidObjectId } = require('mongoose');

const { Comment, User } = require('../models/index');

module.exports = {

    async getComments(req, res) {
        try {
            const comments = await Comment.find({})
                .sort({ _id: -1 })
                .select('-__v -id');
            res.status(200).json({ comments });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async createComment(req, res) {
        try {
            const { userId, username, comment } = req.body;
    
            // Check if the user exists in the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            // Verify that the provided username matches the userId
            if (user.username !== username) {
                return res.status(400).json({
                    message: "UserId does not match the provided username"
                });
            }
    
            // Create the comment and store it in the database
            const newComment = await Comment.create(req.body);
    
            // Update the user's comments array
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { comments: newComment._id } },
                { new: true }
            );
    
            // If for some reason the user is not found after updating, return an error
            if (!updatedUser) {
                return res.status(404).json({
                    message: "Comment created, but no user found with this id!"
                });
            }
    
            // Send a success response
            res.status(200).json({
                message: "Comment successfully created!",
                comment: newComment // Optionally return the created comment
            });
    
        } catch (error) {
            // Handle errors
            res.status(500).json({ message: error.message });
        }
    },
    
    async updateComment(req, res) {
        try {
            const { comment } = req.body;

            const dbComment = await Comment.findByIdAndUpdate(
                { _id: req.params.id},
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
    
            // If the comment is not found, return an error
            if (!dbComment) {
                return res.status(404).json({
                    message: "No Comments found"
                });
            }
            // Send a success response
            res.status(200).json({
                message: "Comment successfully updated!",
                comment: dbComment // Optionally return the updated comment
            });
    
        } catch (error) {
            // Handle errors
            res.status(500).json({ message: error.message });
        }
    },

    async deleteComment(req, res) {
        try {
            const { id } = req.params;
            if(id && !isValidObjectId(id)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }   
            const deleteComment = await Comment.findByIdAndDelete({ _id: req.params.id });
            if (!deleteComment) {
                return res.status(404).json({ message: "No comment found with this id!" });
            }
            res.status(200).json({ message: "Comment successfully deleted!" });
        } catch (error) {
            // Handle errors
            res.status(500).json({ message: error.message });
        }
    }
}
