'use strict';

import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import * as model from './api/models/dbcardsModel';
let cards   = require('./api/routes/dbcardsRoutes'),
    app     = express(),
    port    = process.env.PORT || 3000;

app.set('port', port);

// Mongoose connect.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sanlu:#sanlu@ds141232.mlab.com:41232/dbzcards');

// Set static folder (frontend main (index) page)
// import path from 'path';
// app.use(express.static(path.join(__dirname, 'src')));

// Body Parser middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers type you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    // Request headers max age.
    res.setHeader('Access-Control-Max-Age', '86400'); // 24h.

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    if (req.method === 'OPTIONS') {
        let headers = {};
        res.writeHead(200, headers);
        res.end();
    } else {
        // Pass to next layer of middleware
        next();
    }
});

// Routing: home
app.get('/', (req, res) => {
    res.send('Welcome to Awesome Sanlu server API main page.');
});

// Routing: Cards
cards(app);

// Routing: 404.
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});

// Listen
app.listen(app.get('port'), () => {
    console.log(`Awesome Sanlu server started on: ${port}`);
});


// Notes:
// To start mongodb service: net start mongodb
// To open mongod (if service not working): mongod --config="c:\Program Files\MongoDB\Server\3.4\mongod.cfg"
// To stop mongodb service: net stop mongodb
// To start nodemon service: npm run nodemon-start