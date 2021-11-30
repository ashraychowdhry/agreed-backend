const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    venmo: {type: String, required: false},
    groups: [{type: String, required: false}],
    card_number: {type: String, required: false},
    expiration: {type: String, required: false},
    cvv: {type: String, required: false},
    cardholder_name: {type: String, required: false},

}, {
    collection: 'user-data'
})

const model = mongoose.model('UserData', User)
module.exports = model