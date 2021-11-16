const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://general-access:<qaz1wsx2>@cluster0.mhu4h.mongodb.net/user-data?retryWrites=true&w=majority')

const port = 3001



app.use(express.json())

app.get('/health', (req, res) => {
    //res.send('HEALTH: OK')
    res.json({status: 'ok'})
})

app.get('/test', (req, res) => {


})

app.listen(port, () => {
    console.log('Server listening to ' + port)
})
