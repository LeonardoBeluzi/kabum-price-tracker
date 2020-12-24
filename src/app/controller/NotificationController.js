const knex = require('../database/knex')

module.exports = {
    async store(newNotification) {
        const notification = await knex('notifications')
            .select(
                'id',
                'price'
            )
            .where('product_id', newNotification.product_id)
            .where('discord_user_id', newNotification.discord_user_id)
            .first()

        if (notification) {
            if (notification.price !== newNotification.price) {
                await knex('notifications')
                    .update({ price: newNotification.price })
                    .where('id', notification.id)
            }

            return notification.id
        } else {
            const insertedNotification = await knex('notifications')
                .insert(newNotification)

            return insertedNotification[0]
        }
    },

    async index() {
        return await knex('products')
            .select(
                'id',
                'external_id'
            )
    },

    async show(product_id, price) {
        return await knex('notifications')
            .select(
                'notifications.id',
                'products.name',
                'notifications.discord_user_id'
            )
            .join('products', 'products.id', 'notifications.product_id')
            .where('notifications.product_id', product_id)
            .where('notifications.price', '>=', price)
    },

    async delete(product_id, discord_user_id) {
        return await knex('notifications')
            .where('product_id', product_id)
            .where('discord_user_id', discord_user_id)
            .delete()
    },

    async storeHistory(data) {
        const parsedHistory = {
            product_id: data.id,
            price: data.price,
            discount_price: data.discount_price
        }

        const insertedHistory = await knex('product_histories')
            .insert(parsedHistory)

        return insertedHistory[0]
    }

}