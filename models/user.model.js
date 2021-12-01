const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthday: {type: Object, required: false},
    gender: {type: String, required: false},
    age: {type: String, required: false}
}, {
    collection: 'user-data'
})

const model = mongoose.model('UserData', User)
module.exports = model