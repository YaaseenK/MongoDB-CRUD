const express = require('express');
const mongoose = require('mongoose');

const app = express();
const URI = "mongodb://localhost:27017/NodeAPI"

app.get('/', (req, res) => {
    res.send("Hello from node APIs Updated!!")
});


mongoose.connect(URI)
.then(() => {
    console.log("Connected to DB");
    app.listen(3001 , () => {
        console.log('Server is Running on port 3001')
    });    
})

.catch(()=> {
    console.log("Connection failed")
});
