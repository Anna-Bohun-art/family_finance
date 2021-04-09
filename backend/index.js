"use strict";
const express = require('express');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

let app = express();
let apiRoutes = require("./entryRouter")
let userRoutes = require("./userRouter")
var port = process.env.PORT || 8080;

// Welcome message
//app.get('/', (req, res) => res.send('Welcome to Express'));

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running on Port "+ port);
})

//Import routes

//Use API routes in the App
app.use('/api', apiRoutes);
app.use("/", userRoutes);

//import mongoose
let mongoose = require('mongoose');

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

//connect to mongoose
const dbPath = 'mongodb://localhost/familyfinance';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})