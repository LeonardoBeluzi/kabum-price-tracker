const axios = require('axios')

const BASE_URL = 'https://servicespub.prod.api.aws.grupokabum.com.br/descricao/v1/descricao/produto/'

module.exports = {
    async getName(external_id) {
        const url = `${BASE_URL}${external_id}`

        const response = await axios.request({
            method: 'GET',
            url,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
                'Connection': 'keep-alive',
                'Host': 'servicespub.prod.api.aws.grupokabum.com.br',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
            }
        }).catch(err => {
            if (err.response.status === 400)
                return err.toJSON()
            else
                return null
        })

        if (response) {
            if (response.data) {
                return response.data.nome
            } else {
                return null
            }
        } else {
            return null
        }


    }
}