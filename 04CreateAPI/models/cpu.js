// import mongoose
const mongoose = require('mongoose');

//create a schema for obj 
const CpuSchema = mongoose.Schema({
    // paramiters || atributes of the obj
        name:{type: String, required: true},
        price: Number,
        quantity: Number,
        inStock: Boolean,
        // lastAccessed: {

        // }

    },
    {timestamps: true}
);

// create a model using the schema
const CPU = mongoose.model('CPU', CpuSchema);

// export model
module.exports = CPU;