const ProductController = require('../../app/controller/ProductController')

module.exports = {
    run: async (client, message, args) => {
        if (args.length === 0) {
            return message.channel.send('Código do produto não informado')
        }

        if (isNaN(args[0])) {
            return message.channel.send('Código do produto deve possuir apenas números.')
        }

        const data = await ProductController.index(args[0])

        if (data) {
            console.log(data.alias)
            return message.channel.send(`subscribed to "${data.alias}"`)
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