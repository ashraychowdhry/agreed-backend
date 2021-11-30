
const port = process.env.port || 3001

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')
const CONNECTION_URL = 'mongodb+srv://gayathri:abeona123@cluster0.e3czw.mongodb.net/abeona-mvp-dummy2?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL)

const User = require('./models/user.model')
const Group = require('./models/group.model')
const Individual = require('./models/individual.model')

const jwt = require('jsonwebtoken')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email, 
            password: req.body.password
        })
        // res.send(user)
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: "Duplicate email"})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email, 
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            "secretToken"
        )
        return res.json({status: 'ok', user: token, userEmail: user.email})
    } else {
        return res.json({status: 'error', user: false})
    }

})
/*
app.post('/api/dashboard', async (req, res) => {
    
     
        const foundPin = await Pin.findOne({securedPin: req.body.securedPin})
        if (foundPin) {
            return res.json({status: 'ok' , foundPin: true})
        } else {
        console.log(foundPin)
        console.log(req.body.securedPin)
        return res.json({status: 'error', foundPin: false})
    }
})
*/
app.post('/api/creategroup', async (req, res) => {

    console.log(req.body)
    var id =  Math.floor(Math.random() * 1000000)
    try {
        await Group.create({
            groupName: req.body.groupName, 
            desiredLocation: req.body.desiredLocation,
            maxPrice: req.body.maxPrice,
            earliestDate: req.body.earliestDate,
            latestDate: req.body.latestDate,
            groupID: id,
            users: req.body.user
            
        })
        res.json({status: 'ok', id: id})
    } catch (error) {
        res.json({status: 'error', error: "invalid form input"})
    }

})

app.post('/api/creditcard', async (req, res) => {
    console.log(req.body)
    try {
        await CreditCard.create({
            card_number: req.body.number, 
            expiration: req.body.expiry,
            cvv: req.body.cvc,
            cardholder_name: req.body.name,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: "invalid form input"})
    }
})

app.post('/api/individualform', async (req, res) => {
    console.log(req.body)
    try {
        await Individual.create({
            budget: req.body.maxPrice, 
            arrival: req.body.arrivalTime, 
            departure: req.body.departureTime, 
            arrivalTime: req.body.arriveOn, 
            departureTime: req.body.departOn, 
            flightPreference: req.body.flightPreference,   
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: "invalid form input"})
    }
})

app.post('/api/joingroup', async (req, res) => {
    console.log(req.body)
    try {
        await User.findOneAndUpdate({_id: req.body.userID}, {groups: groups + req.body.securedPin})
        await Group.findOneAndUpdate({groups: req.body.securedPin}, {users: users + req.body.userID})
        res.json({status: 'ok', id: req.body.securedPin})
    } catch (error) {
        res.json({status: 'error', error: error.message})
    }
})

app.get('/api/getusergroups', async (req, res) => {
    try {
        const users = await Group.find({ users: req.body.userId })
        res.json({status: 'ok', users})
    } catch (error) {
        res.json({status: 'error', error: "invalid input"})
    }
    
})



app.listen(port, () => {
    console.log('Server listening to ' + port)
})