module.exports = {
    async up(knex) {
        return knex.schema.table('notifications', table => {
            table.decimal('last_price', 8, 2).notNullable()
        })
    },
    
    async down(knex) {
        return knex.schema.table('notifications', table => {
            table.dropColumn('last_price')
        })
    }
}