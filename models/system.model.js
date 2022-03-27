const mongoose = require('mongoose')

const System = new mongoose.Schema({
    systemJSON: {type: String, required: true},
    systemToken: {type: String, required: true},
    systemName: {type: String, required: true},
    systemIndustry: {type: String, required: false},
    systemCompany: {type: String, required: false},
    systemLabels: {type: String, required: true},
    systemUnit: {type: String, required: true},
    systemTimeUnit: {type: String, required: true},
    
}, {
    collection: 'system-data-new'
})

const model = mongoose.model('SystemDataNew', System)
module.exports = model