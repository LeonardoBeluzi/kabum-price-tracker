const routine = require('./src/app/functions/priceCheck')
const bot = require('./src/discord/bot')
require('dotenv').config()

const routineTime = 1000 * 60 * 30

async function main() {
    await bot.start()


    const notifications = await routine.processProductList()
    if (notifications.length > 0) {
        notifications.forEach(notification => {
            bot.sendMessage(notification.discord_user_id, notification.message)
        })        
    }
    console.log('----------')
    console.log('Aguardando proxima rotina')

    setInterval(async function () {
        await routine.processProductList()
        console.log('----------')
        console.log('Aguardando proxima rotina')
    }, routineTime);
}

main()

