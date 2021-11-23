const mongoose = require('mongoose')

const CreditCard = new mongoose.Schema({
    card_number: {type: String, required: true},
    expiration: {type: String, required: true},
    cvv: {type: String, required: true},
    cardholder_name: {type: String, required: true},
}, {
    collection: 'creditcard-data'
})

const model = mongoose.model('CreditCard', CreditCard)
module.exports = model