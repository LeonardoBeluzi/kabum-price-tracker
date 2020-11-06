const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        product_id: {
            type: Number,
            required: true
        },

        alias: {
            type: String,
            required: true
        },

        history: [
            {
                created_at: {
                    type: String,
                    required: true
                },
        
                original_price: {
                    type: Number,
                    required: true
                },
        
                promotional_price: {
                    type: Number,
                    required: true
                },
            }
        ]
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("products", ProductSchema)