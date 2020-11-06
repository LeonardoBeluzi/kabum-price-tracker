const database = require('./src/database/Connection')
const routine = require('./src/app/functions/priceCheck')



async function main() {
    await database.connect()
    await routine.processProductList()

    setInterval(function () {
        routine.processProductList()
    }, 60000);
}

main()

