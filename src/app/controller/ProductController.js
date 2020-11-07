const knex = require('../database/knex')

module.exports = {
    async store() {
    },

    async index() {
        const products = await knex('products')
            .select(
                'id',
                'external_id'
            )

        return products
    },

    async show(product_id) {
        const product = await knex('products')
            .select(
                'id',
                'external_id',
                'name'
            )
            .where('external_id', product_id)
            .first()

        return product
    },

    async storeHistory(data) {
        console.log('Preparando para a inserção de dados')

        const product = await knex('products')
            .select('id')
            .where('external_id', data.external_id)
            .first()

        if (!product) {
            return null
        }

        const parsedHistory = {
            product_id: product.id,
            price: data.price,
            discount_price: data.discount_price
        }

        const insertedHistory = await knex('product_histories')
            .insert(parsedHistory)

        console.log('Finalizando a inserção de dados')

        return insertedHistory[0]
    }

}