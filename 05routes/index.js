const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product-route');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// mongodb server connection string
const URI = "mongodb://localhost:27017/NodeAPI";

// app.get('/', (req, res)=> {
//     res.send('Connected to Node API')
// });

app.use('/api/products', productRoute);

mongoose.connect(URI)
.then(() =>{
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server running on localhost:${PORT}`);
    });
})
.catch(()=>{
    console.log('Connection Failed');
});