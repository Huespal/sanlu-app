'use strict';

let cards = require('../controllers/dbcardsController');

module.exports = (app) => {
    // GET cards.
    // POST card.
    app.route('/api/cards')
        .get(cards.get_all_cards)
        .post(cards.create_card);

    // GET card.
    // PUT card.
    // DELETE card.
    app.route('/api/cards/:id')
        .get(cards.get_card)
        .put(cards.modify_card)
        .delete(cards.delete_card);
};