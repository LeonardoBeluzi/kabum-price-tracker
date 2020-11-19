const ProductController = require('../../app/controller/ProductController')
const api = require('./nameCheck')
const parser = require('./urlParser')

module.exports = {
    async insertProduct(userEntry) {
        var id = userEntry

        if (isNaN(id)) {
            try {
                new URL(id)
            } catch (error) {
                return null
            }

            id = parser.parseURL(id)
        }


        const product = await ProductController.show(id)

        if (product === undefined) {
            const productName = await api.getName(id)

            if (!productName) {
                return null
            }

            const parsedProduct = {
                external_id: id,
                name: productName
            }

            const insetedId = await ProductController.store(parsedProduct)

            return {
                id: insetedId,
                name: productName
            }
        }

        return {
            id: product.id,
            name: product.name
        }        
    }
}