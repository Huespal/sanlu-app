import { Component } from '@angular/core';
import { DbCardsService } from './dbcards.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-dbcards',
  providers: [DbCardsService],
  templateUrl: './dbcards.component.html',
  styleUrls: ['./dbcards.component.scss']
})
export class DbCardsComponent {

    /**
     * @desc
     *  Characters data.
     * @type {Array}
     */
    characters  = [];

    /**
     * @desc
     *  Skills data.
     * @type {Array}
     */
    skills      = [];

    /**
     * @desc
     *  Starts game.
     *  - Gets cards from server.
     */
    onStart() {
       this.getCards();
    }

    /**
     * @desc
     *  Gets all game cards.
     */
    getCards() {
        this.dbcardsService.getCharacters()
            .then((r) => {
                this.characters = r;
                return this.dbcardsService.getSkills();
             })
            .then((r) => { this.skills = r; })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Gets card id from card component and stores it.
     * @param {Object} e - The event object.
     */
    handleCardEvent(e) {
        if (e.attack) { alert(`Perform attack: ${e.attack.name}`); }
    }

    constructor(private dbcardsService: DbCardsService) { }
}
