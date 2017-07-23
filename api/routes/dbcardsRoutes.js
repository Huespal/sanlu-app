'use strict';

let db_cards = require('../controllers/dbcardsController');

let routes = (app) => {
    // GET cards.
    // POST card.
    app.route('/api/cards')
        .get(db_cards.get_all_cards)
        .post(db_cards.create_card);

    // GET card.
    // PUT card.
    // DELETE card.
    app.route('/api/cards/:id')
        .get(db_cards.get_card)
        .put(db_cards.modify_card)
        .delete(db_cards.delete_card);
};

module.exports = routes;