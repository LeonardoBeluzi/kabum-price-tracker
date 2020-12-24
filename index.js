const routine = require('./src/app/functions/productRoutine')
const bot = require('./src/discord/bot')
require('dotenv').config()

const routineTime = 1000 * 60 * 30

async function main() {
    await bot.start()
    await routine.start(bot)

    setInterval(async function () {
        await routine.start(bot)
    }, routineTime);
}

main()

