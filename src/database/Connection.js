require('dotenv').config()
const mongoose = require('mongoose')

const uri = `mongodb+srv://potatolicious:${process.env.MONGO_PASSWORD}@cluster0.oi3zo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

module.exports = {
    async connect() {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('connected to mongo database')
            })
            .catch(err => {
                console.log(err)
            })
    }
}