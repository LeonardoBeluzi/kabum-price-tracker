const cheerio = require('cheerio')
const axios = require('axios')

const BASE_URL = 'https://www.kabum.com.br/produto/'

function formatPrice(price) {
    return price.replace('R$ ', '').replace('.', '').replace(',', '.')
}

module.exports = {
    async getData(product_id) {
        const url = `${BASE_URL}${product_id}`
        const page = await axios.request({
            method: 'GET',
            url,
            responseType: 'arraybuffer',
            responseEncoding: 'binary'
        })

        return page.data.toString('latin1')
    },

    processData(data) {
        const scrapper = cheerio.load(data)

        const root = scrapper('body')

        const productId = root.find('span[itemprop="sku"]').text().trim()
        const productName = root.find('h1[class="titulo_det"]').text().trim()

        const normalPrice = root.find('div[class="preco_normal"]')

        if (normalPrice.length > 0) {
            const price = formatPrice(normalPrice.text().trim())
            const promotionalPrice = formatPrice(root.find('span[class="preco_desconto"]').find('span').find('span').find('strong').text().trim())

            return {
                status: 'normal',
                productId,
                productName,
                price,
                promotionalPrice
            }
        }

        const offerPrice = root.find('div[class="box-quantidades q1"]')

        if (offerPrice.length > 0) {
            const discount = root.find('div[class="box-quantidades q1"]').text().trim()
            const quantity = root.find('div[class="box-quantidades q2"]').text().trim()
            const sold = root.find('div[class="box-quantidades q3"]').text().trim()

            const oldPrice = formatPrice(root.find('div[class="preco_antigo-cm"]').text().trim().replace('De ', '').replace('por', ''))
            const price = formatPrice(root.find('div[class="preco_desconto-cm"]').find('span').find('strong').text().trim())
            const promotionalPrice = formatPrice(root.find('span[class="preco_desconto_avista-cm"]').text().trim())

            return {
                status: 'offer',
                productId,
                productName,
                discount,
                quantity,
                sold,
                oldPrice,
                price,
                promotionalPrice
            }
        }

        return {
            status: 'out of stock',
            productId,
            productName,
            price: 0
        }
    }
}