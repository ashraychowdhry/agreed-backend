
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
        console.log('User created')
    } catch (error) {
        console.log(error)
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
            users: req.body.userID
            
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
            budget: req.body.budget,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            flightPreference: req.body.flightPreference,
            userId: req.body.userID,
            groupID: req.body.groupID,
            arrival: req.body.arrival,
            departure: req.body.departure,
            originAirport: req.body.originAirport,
             
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: "invalid form input"})
    }
})

app.post('/api/joingroup', async (req, res) => {
    console.log(req.body)
    try {
            await User.update({email: req.body.userID}, { $push: { groups: req.body.securedPin } });
            await Group.update({groupID: req.body.securedPin}, { $push: { users: req.body.userID } });
            res.json({status: 'ok', id: req.body.securedPin})
        
        //await Group.findOneAndUpdate({groupID: req.body.securedPin}, {users: users + req.body.userID})
    } catch (error) {
        res.json({status: 'error', error: error.message})
    }
})

app.post('/api/getusergroups', async (req, res) => {
    try {
        console.log(req.body.userID)

        var id = req.body.userID
        const groups = await Group.find({ users: id })
        console.log(groups)
        res.json({status: 'ok', groups})
    } catch (error) {
        res.json({status: 'error', error: "invalid input"})
    }
    
})

app.post('/api/getgroupusersforms', async (req, res) => {
    try {
        console.log(req.body.groupID)

        var id = req.body.groupID
        const userforms = await Individual.find({ groupID: id })
        console.log(userforms)
        res.json({status: 'ok', userforms})
    } catch (error) {
        res.json({status: 'error', error: "invalid input"})
    }
    
})

app.post('/api/getgroup', async (req, res) => {
    try {
        console.log(req.body.groupID)

        var id = req.body.groupID
        const group = await Group.find({ groupID: id })
        console.log(group)
        res.json({status: 'ok', group})
    } catch (error) {
        res.json({status: 'error', error: "invalid getgroup input"})
    }
    
})



app.listen(port, () => {
    console.log('Server listening to ' + port)
})