const express = require('express');
const db = require ('./config/connection');

// require model
const { Book } = require ('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended : true }));
app.use(express.json);

app.get('/all-books', (req,res) => {
    // Useing model to find all docs that are instances of the model
    Book.find({}, (err, result) =>{
        if(err){
            res.status(500).send({ message: 'Internal Server Error'});
        } else {
            res.status(200).json(result);
        }
    });
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!!`)
    })
})