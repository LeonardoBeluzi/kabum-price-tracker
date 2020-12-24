module.exports = {
    async up(knex) {
        return knex.schema.table('product_histories', table => {
            table.decimal('old_price', 8, 2).notNullable()
            table.decimal('discount_percentage', 8, 2).notNullable()
        })
    },
    
    async down(knex) {
        return knex.schema.table('product_histories', table => {
            table.dropColumn('old_price')
            table.dropColumn('old_pdiscount_percentagerice')
        })
    }
}