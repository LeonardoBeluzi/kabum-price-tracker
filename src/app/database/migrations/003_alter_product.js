module.exports = {
    async up(knex) {
        return knex.schema.table('products', table => {
            table.string('photo_url').notNullable()
        })
    },
    
    async down(knex) {
        return knex.schema.table('products', table => {
            table.dropColumn('photo_url')
        })
    }
}