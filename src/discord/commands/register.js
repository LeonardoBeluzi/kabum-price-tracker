const register = require('../functions/registerProduct')

module.exports = {
    run: async (client, message, args) => {
        if (args.length === 0) {
            return message.channel.send('Código do produto não informado.')
        }

        const product = await register.insertProduct(args[0])

        if (product) {
            return message.channel.send(`Produto "${product.name}" foi cadastrado.`)
        }

        return message.channel.send(`Produto informado não existe.`)
    },

    conf: {},

    get help() {
        return {
            name: 'register',
            description: 'Registra o produto na lista.',
            usage: 'register',
            category: 'Info'
        }
    }
}