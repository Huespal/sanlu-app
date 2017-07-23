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

    // TODO: Get from server:
    characters = [
        {
            id: '5974bf9b734d1d6202a9244f',
            name: 'Cor petit',
            type: 1,
            energy: 1000,
            maxEnergy: 1000,
            picture: 'cor_petit',
            attacks: [
                {
                    name: 'Raig malèfic'
                },
                {
                    name: 'Combo',
                    damage: 80
                },
                {
                    name: 'Gegant'
                }
            ]
        },
        {
            id: '5974c0dd734d1d6202a924e1',
            name: 'Freezer 100%',
            type: 1,
            energy: 2000,
            maxEnergy: 2000,
            picture: 'freezer_100',
            attacks: [
                {
                    name: 'Raig de la mort'
                },
                {
                    name: 'Combo',
                    damage: 160
                },
                {
                    name: 'Discs destructors'
                }
            ]
        },
        {
            id: '5974c116734d1d6202a924f2',
            name: 'Son Goku SS3',
            type: 1,
            energy: 8000,
            maxEnergy: 8000,
            picture: 'goku_ss3',
            attacks: [
                {
                    name: 'Kame hame ha'
                },
                {
                    name: 'Combo',
                    damage: 670
                },
                {
                    name: 'Puny del drac'
                }
            ]
        }];

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
