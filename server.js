'use strict';

import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import * as model from './api/models/dbcardsModel';
let cards = require('./api/routes/dbcardsRoutes');

let app     = express(),
    port    = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sanlu:#sanlu@ds141232.mlab.com:41232/dbzcards');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(`Awesome Sanlu server started on: ${port}`);
});

// Set Static Folder
// import path from 'path';
// app.use(express.static(path.join(__dirname, 'src')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 404.
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});

// API Routing
// let index = require('./api/routes/indexRoutes');
// app.use('', index);
app.use('/api', cards);

app.listen(port);

// To start mongodb service: net start mongodb
// To open mongod (if service not working): mongod --config="c:\Program Files\MongoDB\Server\3.4\mongod.cfg"
// To stop mongodb service: net stop mongodb
// To start nodemon service: npm run nodemon-start