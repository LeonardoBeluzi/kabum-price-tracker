const ProductController = require('../controller/ProductController')
const scrapper = require('./scrap')

async function getProductData() {
    const data = await ProductController.index()

    if (data) {
        return data
    } else {
        return []
    }
}

async function processData(data) {
    for (const item of data) {
        console.log('----------')
        console.log(`Buscando dados do produto ${item.external_id}`)

        const data = await scrapper.getData(item.external_id)
        const processedData = scrapper.processData(data)

        if (processedData) {
            var history = {
                external_id: item.external_id,
                price: 0,
                discount_price: 0
            }

            if (processedData.status === 'out of stock') {
                await ProductController.storeHistory(history)
            } else if (processedData.status === 'normal') {
                history.price = processedData.price
                await ProductController.storeHistory(history)
            } else if (processedData.status === 'offer') {
                history.price = processedData.price
                history.discount_price = processedData.promotionalPrice
                await ProductController.storeHistory(history)
            }
        }
    }
}

module.exports = {
    async processProductList() {
        const data = await getProductData()
        await processData(data)
        console.log('----------')
        console.log('Aguardando proxima rotina')
    }
}