// Import the necessary moduless
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/router-index')
// const routes = require('./routes/roueter-index');

// Initialize the Express application and create the server
const app = express();

// Define the MongoDB connection URI and the port the server will listen on
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Establish a connection to the MongoDB database using Mongoose
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});