// Import the necessary modules
const express = require('express'); // Express framework for building the server
const db = require('./config/connection'); // Import the database connection
const routes = require('./routes/routes-index'); // Import the routes from the routes-index file

// Initialize the Express application
const app = express();

// Define the MongoDB connection URI and the port the server will listen on
const URI = 'mongodb://localhost:27017/NodeAPI'; // MongoDB connection string
const PORT = process.env.PORT || 3001; // Port number for the server

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Use the imported routes for handling requests
app.use(routes);

// Connect to the MongoDB database using Mongoose
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});