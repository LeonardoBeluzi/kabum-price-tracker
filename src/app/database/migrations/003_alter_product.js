module.exports = {
    async up(knex) {
        return knex.schema.table('products', table => {
            table.text('photo_url').notNullable()
        })
    },
    
    async down(knex) {
        return knex.schema.table('products', table => {
            table.dropColumn('photo_url')
        })
    }
}