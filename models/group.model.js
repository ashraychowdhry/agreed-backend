const mongoose = require('mongoose')

const Group = new mongoose.Schema({
    groupName: {type: String, required: true},
    desiredLocation: {type: String, required: false},
    maxPrice: {type: String, required: true},
    earliestDate: {type: Object, required: true},
    latestDate: {type: Object, required: true},
    quote: {type: String},
    

}, {
    collection: 'group-data'
})

const model = mongoose.model('Groups', Group)
module.exports = model