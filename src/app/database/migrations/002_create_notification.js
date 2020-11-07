module.exports = {
    async up(knex) {
        return knex.schema.createTable('notifications', table => {
            table.increments('id').primary().notNullable()
            table.integer('product_id').notNullable().unsigned().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE')
            table.string('discord_user_id')
            table.decimal('price', 8, 2).notNullable()
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        })
    },

    async down(knex) {
        return knex.schema.dropTable('notifications')
    }
}