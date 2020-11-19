require('dotenv').config()

const Discord = require('discord.js')
const { readdirSync } = require('fs')
const path = require('path')
const Enmap = require('enmap')
const client = new Discord.Client()

module.exports = {
    async start() {
        client.commands = new Enmap()
        client.startTime = Date.now()

        const cmdFiles = readdirSync(path.resolve('src', 'discord', 'commands'))

        console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)

        cmdFiles.forEach(f => {
            try {
                const props = require(path.resolve('src', 'discord', 'commands', f))

                if (f.split('.').slice(-1)[0] !== 'js') {
                    return
                } 

                console.log('log', `Carregando comando: ${props.help.name}`)

                if (props.init) {
                    props.init(client)
                }

                client.commands.set(props.help.name, props)

                if (props.help.aliases) {
                    props.alias = true
                    props.help.aliases.forEach(alias => client.commands.set(alias, props))
                }
            } catch (e) {
                console.log(`Impossivel executar comando ${f}: ${e}`)
            }
        })

        const evtFiles = readdirSync(path.resolve('src', 'discord', 'events'))

        console.log('log', `Carregando o total de ${evtFiles.length} eventos`)

        evtFiles.forEach(f => {
            const eventName = f.split('.')[0]
            const event = require(path.resolve('src', 'discord', 'events', f))

            client.on(eventName, event.bind(null, client))
        })

        await client.login(process.env.DISCORD_TOKEN)
    },

    async sendMessage(discord_user_id, message) {
        client.users.fetch(discord_user_id).then((user) => {
            user.send(message);
           })
    }
}







