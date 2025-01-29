const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

const URI = "mongodb://localhost:27017/NodeAPI";

// call get req to see if server is running
app.get('/', (req, res) => {
    res.send("Hello from node APIs Updated!!");
});

mongoose.connect(URI)
.then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () =>{
        console.log('Server running on port 3001')
    })
})
.catch(()=>{
    console.log('Connection Failed')
})