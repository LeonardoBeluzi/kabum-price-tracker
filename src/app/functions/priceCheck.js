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
    data.forEach(async item => {
        const data = await scrapper.getData(item.product_id)
        const processedData = scrapper.processData(data)

        if (processedData) {
            var history = {
                created_at: new Date().toLocaleString('pt-BR'),
                original_price: 0,
                promotional_price: 0
            }

            if (processedData.status === 'out of stock') {
                await ProductController.storeHistory(processedData.productId, history)
            } else if (processedData.status === 'normal') {
                history.original_price = processedData.price
                await ProductController.storeHistory(processedData.productId, history)
            } else if (processedData.status === 'offer') {
                history.original_price = processedData.price
                history.promotional_price = processedData.promotionalPrice
                await ProductController.storeHistory(processedData.productId, history)
            }
        }
    })
}

module.exports = {
    async processProductList() {
        const data = await getProductData()
        processData(data)
    }
}