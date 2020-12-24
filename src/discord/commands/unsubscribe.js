const NotificationController = require('../../app/controller/NotificationController')

module.exports = {
    run: async (client, message, args) => {
        if (args.length === 0) {
            return message.channel.send('Código do produto não informado.')
        }

        await NotificationController.delete(args[0], message.author.id)

        return message.channel.send(`Você foi descadastrado para receber notificações do produto.`)
    },

    conf: {},

    get help() {
        return {
            name: 'unsubscribe',
            description: 'Remove o registro para receber notificações de um produto.',
            usage: 'unsubscribe',
            category: 'Info'
        }
    }
}