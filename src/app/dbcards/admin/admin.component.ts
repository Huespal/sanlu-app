import { Component, OnInit } from '@angular/core';
import { Character } from '../card/character';
import { DbCardsService } from '../dbcards.service';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin',
  providers: [DbCardsService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    /**
     * @desc
     *  Current card data.
     * @type {Character}
     */
    currentCard     = Character;

    /**
     * @desc
     *  Characters data.
     * @type {Array}
     */
    characters      = [];

    /**
     * @desc
     *  Characters data.
     * @type {Array}
     */
    charactersList  = [];

    /**
     * @desc
     *  Tru if is editing card.
     * @type {boolean}
     */
    isEditing       = false;

    /**
     * @desc
     *  True if is creating card.
     * @type {boolean}
     */
    isCreating      = false;

    /**
     * @desc
     *  Card form.
     * @type {FormGroup}
     */
    cardForm        =  this.fb.group({
        cardName: ['', Validators.required],
        cardPicture: ['', Validators.required],
        cardAttack1: ['', Validators.required],
        cardAttack2: ['', Validators.required],
        cardAttack3: ['', Validators.required],
        hasExtraAttack: [false, null],
        cardAttackExtra: ['', null]
    });

    /**
     * @desc
     *  Search form.
     * @type {FormGroup}
     */
    searchForm    = this.fb.group({
        searchInput: ['', Validators.required]
    });

    /**
     * @desc
     *  Callback to submit card form.
     *  - Create card.
     *  - Edit card.
     *  @params $event - The click event.
     */
    onSubmitForm() {
        if (this.isCreating) {this.createCard();
        } else if (this.isEditing) {this.editCard(); }
    }

    /**
     * @desc
     *  Callback to submit card form.
     *  - Create card.
     *  - Edit card.
     *  @params $event - The click event.
     */
    onSearchCard() {
        const val = this.searchForm.controls.searchInput.value.toLowerCase();
        if (val !== '') {
            this.charactersList = this.charactersList.filter(x => x.name.toLowerCase().includes(val) ||
                x.attacks.filter(attack => attack.name.toLowerCase().includes(val) ||
                (!!attack.damage) ? attack.damage === parseInt(val, 10) : false).length > 0);
        } else {this.charactersList = this.characters; }
    }

    /**
     * @desc
     *  Creates a card. Sends information to server to create a card.
     */
    createCard() {
        console.log(`Card name: ${this.cardForm.controls.cardName.value}`);
        console.log(`Card picture: ${this.cardForm.controls.cardPicture.value}`);


        console.warn(`TODO: create card with ${this.currentCard}`);
    }

    /**
     * @desc
     *  Edits a card. Sends information to server to edit a card.
     */
    editCard() {
        console.warn(`TODO: edit a card with ${this.currentCard} information`);
    }

    /**
     * @desc
     *  Gets all game cards.
     */
    getCards() {
        this.dbcardsService.getCards()
            .then((r) => { this.characters = r; this.charactersList = r; })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  On init class.
     *  - Get cards.
     */
    ngOnInit() {
        this.getCards();
    }

    constructor(public fb: FormBuilder, private dbcardsService: DbCardsService) { }
}
