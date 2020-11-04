module.exports = {

    run: (client, message, args) => {
      const embed = {
        color: 0xFF7C00,
        title: 'Lista de comandos',
        timestamp: new Date(),
        footer: {
          text: '2020 Kabum Price Checker ツ'
        },
        fields: []
      }
  
      let commands = client.commands
  
      if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin)
  
      commands.forEach(command => {
        if (command.alias) return
        embed.fields.push({
          name: `**!${command.help.name}**`,
          value: `*Descrição*: ${command.help.description}
          *Categoria*: ${command.help.category}\n`
        })
      })
  
      message.author.send({
        embed: embed
      })
        .then(() => message.react('✉️'))
        .catch(() => message.reply('eu não tenho permissões para enviar DM para você 😥'))
    },
  
    conf: {},
  
    help: {
      name: 'help',
      category: 'Ajuda',
      description: 'Mostra todos os comandos disponíveis do bot.',
      usage: 'help'
    }
  }