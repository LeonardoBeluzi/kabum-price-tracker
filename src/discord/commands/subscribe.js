const NotificationController = require('../../app/controller/NotificationController')
const register = require('../functions/registerProduct')

module.exports = {
    run: async (client, message, args) => {
        if (args.length === 0) {
            return message.channel.send('Código do produto não informado.')
        }

        if (args.length === 1) {
            return message.channel.send('Preço do produto não informado.')
        }

        if (isNaN(args[1])) {
            return message.channel.send('Preço do produto deve possuir apenas números.')
        }

        const product = await register.insertProduct(args[0])

        if (product) {
            const parsedNotification = {
                product_id: product.id,
                discord_user_id: message.author.id,
                price: Number(args[1])
            }

            await NotificationController.store(parsedNotification)

            return message.channel.send(`Inscrito para "${product.name}".`)
        } else {
            return message.channel.send(`Produto não encontrado.`)
        }
    },

    conf: {},

    get help() {
        return {
            name: 'subscribe',
            description: 'Registro para receber notificações de um produto.',
            usage: 'subscribe',
            category: 'Info'
        }
    }
}