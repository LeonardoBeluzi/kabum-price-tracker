const cheerio = require('cheerio')
const axios = require('axios')
const connection = require('./src/database/Connection')
const discord = require('./src/discord/Discord')

//const BASE_URL = 'https://www.kabum.com.br/produto/111161/monitor-gamer-aoc-hero-w-led-27-widescreen-fhd-ips-hdmi-displayport-g-sync-compatible-144hz-1ms-altura-ajust-vel-27g2-bk'
//const BASE_URL = 'https://www.kabum.com.br/produto/111160/monitor-gamer-aoc-hero-w-led-23-8-widescreen-fhd-ips-hdmi-displayport-freesync-144hz-1ms-altura-ajust-vel-24g2-bk'
//const BASE_URL = 'https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=85196'
const products = [
    'https://www.kabum.com.br/produto/111161',
    'https://www.kabum.com.br/produto/111160',
    'https://www.kabum.com.br/produto/85197'
]

async function getData(url) {
    const page = await axios.request({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    })

    return page.data.toString('latin1');
}

function processData(data) {
    const scrapper = cheerio.load(data)

    const root = scrapper('body')

    const productName = root.find('h1[class="titulo_det"]').text().trim()
    console.log(productName)

    const normalPrice = root.find('div[class="preco_normal"]')

    if (normalPrice.length > 0) {
        const price = normalPrice.text().trim()
        const discountPrice = root.find('span[class="preco_desconto"]').find('span').find('span').find('strong').text().trim()

        console.log(`Preço: ${price}`)
        console.log(`Boleto: ${discountPrice}`)
    } else {
        const discount = root.find('div[class="box-quantidades q1"]').text().trim()
        const quantity = root.find('div[class="box-quantidades q2"]').text().trim()
        const sold = root.find('div[class="box-quantidades q3"]').text().trim()

        const oldPrice = root.find('div[class="preco_antigo-cm"]').text().trim().replace('De ', '').replace('por', '')
        const price = root.find('div[class="preco_desconto-cm"]').find('span').find('strong').text().trim()
        const discountPrice = root.find('span[class="preco_desconto_avista-cm"]').text().trim()

        console.log(`Desconto: ${discount}`)
        console.log(`Quantidade: ${quantity}`)
        console.log(`Vendidos: ${sold}`)

        console.log(`Preço Anterior: ${oldPrice}`)
        console.log(`Preço: ${price}`)
        console.log(`Boleto: ${discountPrice}`)
    }

    console.log('')
}

async function search() {
    products.forEach(product => {
        getData(product).then((result) => {
            processData(result)
        })
    })
}

async function main() {
    await connection.connect()
    await discord.connect()
    await search()
    
    setInterval(function () {
        console.log(new Date().toISOString())
        search()
    }, 60000);
}

main()

