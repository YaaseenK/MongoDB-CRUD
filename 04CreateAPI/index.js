// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cpu = require('./models/cpu');

// identify app
const app = express();

// Server PORT
const PORT = 3001;
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongodb server connection string
const URI = "mongodb://localhost:27017/NodeAPI";

// routes
app.use("/api/products", productRoutes)


// default server route/path
app.get('/', (req, res) => {
    // when path is reached res will send this message
    res.send(`Connected Node API`);
});

// calls all data inside of the collection
app.get('/api/cpu', async (req, res) => {
    try {
        const CPU = await cpu.find({});
        res.status(200).json(CPU);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Route to retrieve a specific CPU document by its Object ID
app.get('/api/cpu/:id', (req, res) => {
    // Find a single document in the 'cpu' collection using the provided ID
    cpu.findOne({ _id: req.params.id })
        .then((singleCPU) =>
            // Conditional (ternary) operator to check if the result (singleCPU) is falsy (null or undefined)
            !singleCPU
                // If singleCPU is falsy (not found), send a 404 response with an error message
                ? res.status(404).json({ message: 'Error: User ID not found' })
                // If singleCPU is truthy (found), send the document as a JSON response
                : res.json(singleCPU)
        )
        // Catch any errors that occur during the query and send a 500 response
        .catch((err) => res.status(500).json(err));
});

// Update a product
app.put('/api/cpu/:id', (req, res) => {
    cpu.findOneAndUpdate(
        { _id: req.params.id },   // Find the document by ID
        req.body,                 // Update the document with request payload
        {
            new: true,            // Return the updated document
            runValidators: true   // Ensure validation is applied
        }
    )
        .then((dbCpuData) => {
            if (!dbCpuData) {
                // Handle case where no matching document is found
                return res.status(404).json({ message: 'No CPU found with this ID' });
            }
            // Return the updated document as JSON
            res.json(dbCpuData);
        })
        .catch((err) => {
            // Handle any errors
            res.status(400).json(err);
        });
});

// Delete a CPU
app.delete('/api/cpu/:id', async (req, res) => {
    try {
        // Find and delete the CPU document by its ID
        const deleteCPU = await cpu.findOneAndDelete({ _id: req.params.id });

        if (!deleteCPU) {
            return res.status(404).json({ message: 'Error: No CPU found with this ID' });
        }

        res.json({ message: 'Success! CPU has been deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});


// route to the talk to server and post to the db
app.post('/api/cpu', async (req, res) => {
    try {
        // async post to db through server
        const CPU = await cpu.create(req.body);
        // success respons message with what was posted
        res.status(200).json(CPU);
    } catch (err) {
        //err message with err code
        res.status(500).json({ message: err.message })
    }
})

// Connect to DB using the URI
mongoose.connect(URI)
    .then(() => {
        console.log('Connected to DB');
        // Connects to server and logs 
        app.listen(PORT, () => {
            console.log(`Server running on localhost:${PORT}`)
        });
    })
    // logs if failed
    .catch(() => {
        console.log('Connection failed')
    })