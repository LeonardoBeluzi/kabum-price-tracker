const Product = require('../model/Product')

module.exports = {
    async store() {
        const data = await Product.create({})

        return res.json(data)
    },

    async indexedDB() {
        const data = await Product.find({})

        return res.json(data)   
    }
}