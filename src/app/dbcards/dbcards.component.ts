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
     *  Starts game.
     */
    onStart() {
        this.getCards();
    }

    /**
     * @desc
     *  Gets all game cards.
     */
    getCards() {
        this.dbcardsService.getCards()
            .then((r) => { console.log(`Cards: ${r}`); })
            .catch((err) => { console.error(err); });
    }

    constructor(private dbcardsService: DbCardsService) { }
}
