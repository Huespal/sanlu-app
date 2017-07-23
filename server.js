'use strict';

import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import * as model from './api/models/dbcardsModel';
import routes from './api/routes/dbcardsRoutes';

let app     = express(),
    port    = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(`Awesome Sanlu server started on: ${port}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});

routes(app);

app.listen(port);

// To open mongod: mongod --config="c:\Program Files\MongoDB\Server\3.4\mongod.cfg"
// To start mongodb service: net start mongodb
// To stop mongodb service: net stop mongodb
// To start nodemon service: npm run nodemon-start