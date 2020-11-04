const Product = require('../model/Product')

module.exports = {
    async store() {
        const data = await Product.create({})

        return res.json(data)
    },

    async index(product_id) {
        return await Product.findOne({ product_id: Number(product_id) }).lean().exec()            
    }
}