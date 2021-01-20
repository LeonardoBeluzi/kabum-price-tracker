const priceChecker = require('./priceCheck')
const NotificationController = require('../controller/NotificationController')

module.exports = {
    async start(bot) {
        const notifications = await priceChecker.processProductList()
    
        if (notifications.length > 0) {
            notifications.forEach(notification => {
                bot.sendMessage(notification.discord_user_id, notification.message)
                NotificationController.updateLastPrice(notification.id, notification.price)
            })        
        }
    
        console.log('----------')
        console.log('Aguardando proxima rotina')
    }
}