"use strict";
const express = require('express');

let app = express();
let apiRoutes = require("./entryRouter")
let userRoutes = require("./userRouter")
var port = process.env.PORT || 8080;

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running on Port "+ port);
})

//import mongoose
let mongoose = require('mongoose');

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Use API routes in the App
app.use('/api', apiRoutes);
app.use("/", userRoutes);

//connect to mongoose
const dbPath = 'mongodb://localhost/familyfinance';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})