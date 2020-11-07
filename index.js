const routine = require('./src/app/functions/priceCheck')
require('dotenv').config()

async function main() {
    await routine.processProductList()

    setInterval(function () {
        routine.processProductList()
    }, 1000 * 60 * 30);
}

main()

