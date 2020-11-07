const path = require('path')
require('dotenv').config()

module.exports = {
  client: 'mysql',

  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8',

    typeCast: function (field, next) {
      if (field.type == 'TINY' && field.length == 1) {
        return (field.string() == '1') // 1 = true, 0 = false
      }
      return next()
    }
  },

  migrations: {
    directory: path.resolve(__dirname, 'src', 'app', 'database', 'migrations'),
  },

  seeds: {
    directory: path.resolve(__dirname, 'src', 'app', 'database', 'seeds'),
  },

  useNullAsDefault: true,

  timezone: 'UTC',

  dateStrings: true
}