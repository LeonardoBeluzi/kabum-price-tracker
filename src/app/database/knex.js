const knex = require('knex')
const knexConfig = require('../../../knexfile.js')

const connection = knex(knexConfig)

connection.on('query', (query) => {
    if (process.env.ENVIRONMENT === 'development') {
        console.log(query.sql)
    }
})

module.exports = connection