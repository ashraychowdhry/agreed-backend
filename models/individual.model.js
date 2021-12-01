const mongoose = require('mongoose')

const Individual = new mongoose.Schema({
    budget: {type: String, required: true},
    arrival: {type: String, required: false},
    departure: {type: String, required: false},
    arrivalTime: {type: String, required: true},
    departureTime: {type: String, required: true},
    originAirport: {type: String, required: false},
    flightPreference: {type: String, required: true},
    userId: {type: String, required: true},
    groupID: {type: String, required: true},
    groups: [{type: String, required: false}],
    card_number: {type: String, required: false},
    expiration: {type: String, required: false},
    cvv: {type: String, required: false},
    cardholder_name: {type: String, required: false},

}, {
    collection: 'individual-data'
})

const model = mongoose.model('Individual', Individual)
module.exports = model