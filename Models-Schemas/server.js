const express = require('express');
const db = require('./config/connection')

// require model
const { Item } = require('./models');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json);

app.get('/all-items', (req, res) => {
    // Using model to find all documents that are instances of that model
    Item.find({}, (err, result) => {
        if(err){
            res.status(500).send({ message: 'Internal Server Error'});
        } else {
            res.status(200).json(result);
        }
    });
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    });
});
