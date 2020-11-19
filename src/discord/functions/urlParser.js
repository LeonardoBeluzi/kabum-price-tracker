module.exports = {
    parseURL(url) {
        const indexKabum = url.indexOf('kabum.com.br')

        if (indexKabum === -1) {
            return null
        }

        const indexProduto = url.indexOf('produto/')

        if (indexProduto > 0) {
            const parsedURL = url.slice(indexProduto)
            const splitedURL = parsedURL.split('/')

            return splitedURL[1]
        }

        const indexCodigo = url.indexOf('codigo=')

        if (indexCodigo > 0) {
            const parsedURL = url.slice(indexCodigo)
            const splitedURL = parsedURL.split('=')

            return splitedURL[1]
        }

        return null
    }
}