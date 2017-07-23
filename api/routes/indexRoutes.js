'use strict';

import express from 'express';
let router = express.Router();

// GET cards.
router.get('/', () => (req, res) => {
    res.send('Welcome to Awesome Sanlu server API main page.');
});

module.exports = router;