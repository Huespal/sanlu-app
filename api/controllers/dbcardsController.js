'use strict';

import mongoose from 'mongoose';

///////////////
//   Greet   //
///////////////

let Greet = mongoose.model('Greet');

// GET greets.
exports.get_all_greets = (req, res) => {
    Greet.find({}, (err, greet) => {manageOutput(res, err, greet);});
};

// POST greet.
exports.create_greet = (req, res) => {
    let new_greet = new Greet(req.body);
    new_greet.save((err, greet) => {manageOutput(res, err, greet);});
};

///////////////
// Character //
///////////////

let Character = mongoose.model('Character');

// GET characters.
exports.get_all_characters = (req, res) => {
    Character.find({}, (err, character) => {manageOutput(res, err, character);});
};

// POST character.
exports.create_character = (req, res) => {
    let new_card = new Character(req.body);
    new_card.save((err, character) => {manageOutput(res, err, character);});
};

// GET character.
exports.get_character = (req, res) => {
    Character.findById(req.params.id, (err, character) => {manageOutput(res, err, character);});
};

// PUT character.
exports.modify_character = (req, res) => {
    Character.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, character) => {manageOutput(res, err, character);});
};

// DELETE character.
exports.delete_character = (req, res) => {
    Character.remove({_id: req.params.id}, (err, output) => {manageOutput(res, err, output);});
};

/////////////
// Skills  //
/////////////

let Skill = mongoose.model('Skill');

// GET skills.
exports.get_all_skills = (req, res) => {
    Skill.find({}, (err, skill) => {manageOutput(res, err, skill);});
};

// POST skill.
exports.create_skill = (req, res) => {
    let new_skill = new Skill(req.body);
    new_skill.save((err, skill) => {manageOutput(res, err, skill);});
};

// PUT skill.
exports.modify_skill = (req, res) => {
    Skill.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, skill) => {manageOutput(res, err, skill);});
};

// GET skill.
exports.get_skill = (req, res) => {
    Skill.findById(req.params.id, (err, skill) => {manageOutput(res, err, skill);});
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