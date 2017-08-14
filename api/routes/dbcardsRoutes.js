'use strict';

let cards = require('../controllers/dbcardsController');

module.exports = (app) => {
    // GET greet.
    // POST greet.
    app.route('/api/greets')
        .get(cards.get_all_greets)
        .post(cards.create_greet);

    // GET characters.
    // POST character.
    app.route('/api/characters')
        .get(cards.get_all_characters)
        .post(cards.create_character);

    // GET character.
    // PUT character.
    // DELETE character.
    app.route('/api/characters/:id')
        .get(cards.get_character)
        .put(cards.modify_character)
        .delete(cards.delete_character);

    // GET skills.
    app.route('/api/skills')
        .get(cards.get_all_skills)
        .post(cards.create_skill);

    // GET skill.
    // PUT skill.
    app.route('/api/skills/:id')
        .get(cards.get_skill)
        .put(cards.modify_skill);
};