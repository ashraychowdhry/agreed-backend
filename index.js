
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
        //await Group.findOneAndUpdate({groupID: req.body.securedPin}, {users: users + req.body.userID})
        res.json({status: 'ok', id: req.body.securedPin})
    } catch (error) {
        res.json({status: 'error', error: error.message})
    }
})

app.post('/api/getusergroups', async (req, res) => {
    try {
        console.log(req.body.userID)
        const groups = await Group.find({ users: req.body.userId })
        console.log(groups)
        res.json({status: 'ok', groups})
    } catch (error) {
        res.json({status: 'error', error: "invalid input"})
    }
    
})



app.listen(port, () => {
    console.log('Server listening to ' + port)
})
// //stripe payments
// const stripe = require("stripe")('pk_test_51K1ZoeGwb0i41CKwBGF7XuFuVAZhTP1QlLNv5l6z917biXKAJQYTVy0K0V0lE2AqS9vDXDJUX2aTv1A4nmZpMz5w00wXoKVI6R');
// const calculateOrderAmount = (items) => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     //leaving the 1400 just to test but we should have a variable called flight_price
//     return (1400+5);
//   };
//   app.post("/create-payment-intent", async (req, res) => {
//     const { items } = req.body;
  
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
  
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   });
  
//   app.listen(4242, () => console.log("Node server listening on port 4242!"));
