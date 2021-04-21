const ProductController = require('../controller/ProductController')
const NotificationController = require('../controller/NotificationController')
const kabum = require('../services/KabumService')

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

    const data = await kabum.getProductData(item.external_id)

    if (!data) return null

    const history = {
        id: item.id,
        external_id: data.external_id,
        price: data.price,
        discount_price: data.discount_price,
        old_price: data.old_price,
        discount_percentage: data.discount_percentage
    }

    await ProductController.storeHistory(history)

    return await processNotification(history)
}

async function processNotification(data) {
    const notifications = await NotificationController.show(data.id, data.discount_price)

    return notifications.filter(notification => {
        return notification.last_price !== data.discount_price

    }).map(notification => {
        return {
            id: notification.id,
            external_id: data.external_id,
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
            if (!itemArray) return

            itemArray.forEach(item => {
                response.push({
                    id: item.id,
                    discord_user_id: item.discord_user_id,
                    message: `O produto "${item.name}" está em promoção!\nR$ ${item.price}\nhttps://www.kabum.com.br/produto/${item.external_id}`,
                    price: item.price
                })
            })
        })

        return response
    }
}