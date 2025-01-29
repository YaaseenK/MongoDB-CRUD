// Import the Express Router to create modular route handlers
const router = require('express').Router();

// Import the API routes from the './api' directory
const apiRoutes = require('./api/api-index');

// Use the API routes for any request starting with '/api'
router.use('/api', apiRoutes);

// Handle 404 errors for any requests that don't match the defined routes
router.use((req, res) => res.status(404).send('Wrong route!'));

// Export the router so it can be used in other parts of the application
module.exports = router;