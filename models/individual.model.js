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
}, {
    collection: 'individual-data'
})

const model = mongoose.model('Individual', Individual)
module.exports = model