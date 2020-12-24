const axios = require('axios')

module.exports = {
    async getProductData(product_id) {
        const url = `https://servicespub.prod.api.aws.grupokabum.com.br/descricao/v1/descricao/produto/${product_id}`
        
        const headers = {
            'Host': 'servicespub.prod.api.aws.grupokabum.com.br',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br'
        }

        try {
            const response = await axios.request({
                method: 'GET',
                url,
                headers: headers
            })

            if (!response.data) return null
            if (!response.data.sucesso === true) return null

            return {
                external_id: response.data.codigo,
                name: response.data.nome,
                photo_url: response.data.fotos[0],
                price: response.data.preco,
                old_price: response.data.preco_antigo,
                discount_price: response.data.preco_desconto,
                discount_percentage: response.data.desconto  
            }
            
        } catch (error) {
            console.log(error)   
            return null
        }
    }
}