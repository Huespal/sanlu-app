'use strict';

import mongoose from 'mongoose';

///////////
// Cards //
///////////

let Card = mongoose.model('Card');

// GET cards.
exports.get_all_cards = (req, res) => {
    Card.find({}, (err, card) => {manageOutput(res, err, card);});
};

// POST card.
exports.create_card = (req, res) => {
    let new_card = new Card(req.body);
    new_card.save((err, card) => {manageOutput(res, err, card);});
};

// GET card.
exports.get_card = (req, res) => {
    Card.findById(req.params.id, (err, card) => {manageOutput(res, err, card);});
};

// PUT card.
exports.modify_card = (req, res) => {
    Card.findOneAndUpdate(
        {id: req.params.id},
        req.body,
        {new: true},
        (err, card) => {manageOutput(res, err, card);});
};

// DELETE card.
exports.delete_card = (req, res) => {
    Card.remove({id: req.params.id}, (err, card) => {manageOutput(res, err, `Card ${card.name} successfully deleted`);});
};

/**
 * @desc
 *  Manages request output.
 * @param {Object} res  - Request result.
 * @param {Object} err  - Request error.
 * @param {Object} data - Request data.
 */
function manageOutput(res, err, data) {
    if (err) res.send(err);
    res.json(data);
}