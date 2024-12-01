const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')
const session = require('express-session')
const { checkAuth } = require('./utils/auth')
require('dotenv').config()


const app = express()

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.u7kjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then((req, res) => {
        console.log('Connected to mongo');
    })
    .catch(err => {
        console.log(err);

    })

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //used for getting data from url that is after submitting form data is passed into url

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SECRET
})) // session setup


app.set('view engine', 'ejs')
app.use(checkAuth)

app.use(router)

app.listen(3000, () => {
    console.log('listening to port 3000');

})