const ProductController = require('../controller/ProductController')
const NotificationController = require('../controller/NotificationController')
const scrapper = require('./scrap')

async function getProductData() {
    const data = await ProductController.index()

    if (data) {
        return data
    } else {
        return []
    }
}

async function processData(item) {
    console.log('----------')
    console.log(`Buscando dados do produto ${item.external_id}`)

    const data = await scrapper.getData(item.external_id)
    const processedData = scrapper.processData(data)

    if (processedData) {
        var history = {
            id: item.id,
            external_id: item.external_id,
            price: 0,
            discount_price: 0
        }

        if (processedData.status === 'normal') {
            history.price = processedData.price
            history.discount_price = processedData.price

            await ProductController.storeHistory(history)
        } else if (processedData.status === 'offer') {
            history.price = processedData.price
            history.discount_price = processedData.promotionalPrice
            
            await ProductController.storeHistory(history)
        }

        return await processNotification(history)
    } else {
        return []
    }
}

async function processNotification(data) {
    const notifications = await NotificationController.show(data.id, data.discount_price)

    return notifications.map(notification => {
        return {
            id: data.external_id,
            discord_user_id: notification.discord_user_id,
            name: notification.name,
            price: data.discount_price
        }
    })
}

module.exports = {
    async processProductList() {
        const data = await getProductData()

        const responseArray = await Promise.all(data.map(async (item) => {
            return await processData(item)
        })).then(response => {
            return response
        })

        const response = []
        responseArray.forEach(itemArray => {
            itemArray.forEach(item => {
                response.push({
                    discord_user_id: item.discord_user_id,
                    message: `O produto "${item.name}" está em promoção!\nR$ ${item.price}\nhttps://www.kabum.com.br/produto/${item.id}`
                })
            })
        })

        return response
    }
}