const mongoose = require("mongoose");

const gpuSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        Price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            require: false,
        },
        lastAccessed: {
            type: Date,
            Default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Gpu = mongoose.model('Gpu', gpuSchema);

module.exports = Gpu;