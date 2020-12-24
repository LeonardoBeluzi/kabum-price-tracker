const ProductController = require('../../app/controller/ProductController')
const kabum = require('../../app/services/KabumService')
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
            const productData = await kabum.getProductData(id)

            if (!productData) {
                return null
            }

            const parsedProduct = {
                external_id: id,
                name: productData.name,
                photo_url: productData.photo_url
            }

            const insetedId = await ProductController.store(parsedProduct)

            return {
                id: insetedId,
                name: productData.name
            }
        }

        return {
            id: product.id,
            name: product.name
        }        
    }
}