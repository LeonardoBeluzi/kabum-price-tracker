const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema)