module.exports = async (client) => {

  const usersAmount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
  const guildsAmount = client.guilds.cache.size
  const botName = client.user.username

  console.log(`Eu estou online agora, meu nome é ${botName}. Há ${usersAmount} usuario(s) em ${guildsAmount} servidor(es)!`)

  client.user.setActivity('price checking 😎')
}