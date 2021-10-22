const mongoose = require('mongoose')

const AccountData = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    
}, {collection: user-data})

const model = mongoose.model('AccountData', AccountData)

module.exports = model