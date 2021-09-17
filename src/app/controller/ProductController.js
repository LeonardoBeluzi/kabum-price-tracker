const knex = require('../database/knex')

module.exports = {
    async store(product) {
        const insertedProduct = await knex('products')
            .insert(product)

        return insertedProduct[0]
    },

    async index() {
        return await knex('products')
            .select(
                'id',
                'external_id'
            )
    },

    async show(product_id) {
        return await knex('products')
            .select(
                'id',
                'external_id',
                'name'
            )
            .where('external_id', product_id)
            .first()
    },

    async storeHistory(data) {
        const history = await knex('product_histories')
            .select(
                'id',
                'price',
                'discount_price'
            )
            .where('product_id', data.id)
            .whereRaw(`CAST(created_at as DATE) = CURDATE()`)
            .first()

        const parsedHistory = {
            product_id: data.id,
            price: Number(data.price),
            discount_price: Number(data.discount_price),
            old_price: Number(data.old_price),
            discount_percentage: Number(data.discount_percentage)
        }

        if (!history) {
            const insertedHistory = await knex('product_histories')
                .insert(parsedHistory)

            return insertedHistory[0]
        } else {    
            if (parsedHistory.price < history.price) {
                await knex('product_histories')
                    .update(parsedHistory)
                    .where('id', history.id)
            }

            return history.id
        }


    }

}