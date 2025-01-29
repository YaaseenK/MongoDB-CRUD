const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');

const app = express();

// Middleware to parse JSON requests
// Form way of adding information
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

const PORT = 3001;

const URI = "mongodb://localhost:27017/NodeAPI";

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

// Test route that reads req.body
app.post('/test', (req, res) => {
    console.log(req.body); // Access the parsed JSON body
    res.send('Request received');
});

app.post('/api/products', async (req, res) => {
    /**
     *  ##posts user entry to console
    console.log(req.body);
        ##shows user what they posted
    res.send(req.body);
     */
    try {
        // create a product obj 
        // Save user input to database
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({message: error.message});
    }

});

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log('Connection Failed')
    })