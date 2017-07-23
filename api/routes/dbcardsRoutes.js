'use strict';

let db_cards = require('../controllers/dbcardsController');
import express from 'express';
let router = express.Router();

// GET cards.
router.get('/cards', db_cards.get_all_cards);

// POST card.
router.post('/cards', db_cards.create_card);

// GET card.
router.get('/cards/:id', db_cards.get_card);

// PUT card.
router.put('/cards/:id', db_cards.modify_card);

// DELETE card.
router.delete('/cards/:id', db_cards.delete_card);

module.exports = router;