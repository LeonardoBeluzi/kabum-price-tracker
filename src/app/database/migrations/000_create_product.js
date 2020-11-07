module.exports = {
    async up(knex) {
        return knex.schema.createTable('products', table => {
            table.increments('id').primary().notNullable()
            table.string('external_id').notNullable()
            table.string('name').notNullable()
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        })
    },
    
    async down(knex) {
        return knex.schema.dropTable('products')
    }
}