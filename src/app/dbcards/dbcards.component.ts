import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DbCardsService } from './dbcards.service';
import { characterStatus } from './dbz-constants';
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
    characters      = [];

    /**
     * @desc
     *  Player one cards data.
     * @type {Array}
     */
    player1Cards    = [];

    /**
     * @desc
     *  Player two cards data.
     * @type {Array}
     */
    player2Cards    = [];

    /**
     * @desc
     *  Active cards.
     * @type {Array}
     */
    activeCards     = [];

    /**
     * @desc
     *  Player turn.
     *  - false: Player 1
     *  - true: Player 2
     * @type {Array}
     */
    turn            = false;

    /**
     * @desc
     *  Character status.
     * @type {Array}
     */
    characterStatus = characterStatus;

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
            .then((r) => {
                this.skills = r;
                if (this.skills.length <= 0 || this.characters.length < 10) {
                    return Promise.reject(this.translateService.instant('FB.ERROR.NOT_ENOUGH_CARDS'));
                } else {
                    this.preparePlayers();
                }
            })
            .catch((err) => { this.snackBar.open(err); });
    }

    /**
     * @desc
     *  Switches turns.
     */
    switchTurn() {
        this.turn = !this.turn;
        this.activeCards = (this.turn) ? this.player2Cards : this.player1Cards;
    }

    /**
     * @desc
     *  Prepares player 1 and 2 for combat.
     */
    preparePlayers() {

        // Add 5 random skill cards to players.
        for (let i = 0; i < 5; i++) {
            this.player1Cards.push(this.skills[Math.floor((Math.random() * (this.skills.length - 1)))]);
            this.player2Cards.push(this.skills[Math.floor((Math.random() * (this.skills.length - 1)))]);
        }

        // Add 5 random characters to players.
        for (let i = 0; i < 5; i++) {
            this.player1Cards.push(this.characters[i]);
            this.player2Cards.push(this.characters[i + 5]);
        }

        this.activeCards = this.player1Cards;
    }

    /**
     * @desc
     *  Character status.
     * @param {Character} card
     */
    setInGame(card) {
        if (card.combo) {
            card.status = characterStatus.inGame;
        } else {
            // TODO: use skill.
        }
    }

    /**
     * @desc
     *  Gets card id from card component and stores it.
     * @param {Object} e - The event object.
     */
    handleCardEvent(e) {
        if (e.attack) {
            alert(`Perform attack: ${e.attack.name}`);
            this.switchTurn();
        }
    }

    constructor(private dbcardsService: DbCardsService, public snackBar: MdSnackBar,
                public translateService: TranslateService) { }
}
