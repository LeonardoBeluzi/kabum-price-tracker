const ProductController = require('../../app/controller/ProductController')

module.exports = {
    run: async (client, message, args) => {
        if (args.length === 0) {
            return message.channel.send('Código do produto não informado')
        }

        if (args.length === 1) {
            return message.channel.send('Apelido do produto não informado')
        }

        const alias = args.reduce((aliasString, arg) => {
            aliasString + arg 
        })

        console.log(alias)

        /*
        console.log(args)
        const data = await ProductController.store(args)

        if (data) {
            console.log(data.alias)
            return message.channel.send(`subscribed to "${data.alias}"`)
        } else {
            return message.channel.send(`Produto não encontrado.`)  
        }
        */
        return message.channel.send(`Produto cadastrado.`)
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