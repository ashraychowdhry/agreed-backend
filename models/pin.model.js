const mongoose = require('mongoose')

const Pin = new mongoose.Schema({
    securedPin: {type: String, required: true}
    
}, {collection: "pin-data"})

const model = mongoose.model('Pin', Pin)

module.exports = model