const Product = require('../model/Product')

module.exports = {
    async store() {
        const data = await Product.create({})

        return res.json(data)
    },

    async index() {
        return await Product.find({}).lean().exec()
    },

    async show(product_id) {
        return await Product.findOne({ product_id: Number(product_id) }).lean().exec()
    },

    async storeHistory(product_id, data) {
        const filter = { product_id: Number(product_id) }
        const product =  await Product.findOne(filter).lean().exec()
        product.history.push(data)

        await Product.updateOne(filter, product).exec()
    }

}