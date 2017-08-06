import { Component, OnInit } from '@angular/core';
import { Character } from '../card/character';
import { DbCardsService } from '../dbcards.service';
import { CardDialogService } from '../cardDialog/cardDialog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { cardTypes } from '../dbz-constants';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../confirm/confirm.service';
import { Attack } from '../card/attack';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin',
  providers: [ConfirmService, DbCardsService, CardDialogService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    /**
     * @desc
     *  Characters data.
     * @type {Character[]}
     */
    charactersList: Character[] = [];

    /**
     * @desc
     *  Characters data.
     * @type {Character[]}
     */
    characters: Character[] = [];

    /**
     * @desc
     *  Card types.
     * @type {Object}
     */
    cardTypes       = cardTypes;

    /**
     * @desc
     *  Current card data.
     * @type {Character}
     */
    currentCard     = new Character(0, '', this.cardTypes.Z, 0, 0, '', 0, []);

    /**
     * @desc
     *  Search form.
     * @type {FormGroup}
     */
    searchForm      = this.fb.group({
        searchInput: ['', Validators.required]
    });

    /**
     * @desc
     *  Callback to allow create card.
     *  @params isCreating - True if want to create a card. False to edit.
     */
    onOpenCardDialog(isCreating) {

        this.cardDialogService
            .open(this.currentCard, isCreating)
            .subscribe(data => {

                if (data) {
                    if (isCreating) {this.createCard(data);
                    } else {this.editCard(this.currentCard.id, data); }
                }
            });
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
     *  Gets card id from card component and stores it.
     * @param {Object} e - The event object.
     */
    handleCardEvent(e) {
        this.currentCard = e.character;
        if (e.remove) {this.deleteCard();
        } else { this.onOpenCardDialog(false); }
    }

    /**
     * @desc
     *  Gets all game cards.
     */
    getCards() {

        this.dbcardsService.getCards()
            .then((r) => {
                this.characters     = [];
                this.charactersList = [];

                r.forEach((item) => {
                    const attacks = [];
                    item.attacks.forEach((_item) => {
                        const attack = new Attack();
                        attack.setName(_item.name);
                        attack.setDamage(_item.damage);
                        attacks.push(attack);
                    });

                    const character = new Character(item._id, item.name, item.type, item.energy,
                        item.maxEnergy, item.picture, item.status, attacks);
                    this.characters.push(character);
                    this.charactersList.push(character);
                });
            })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Creates a card. Sends information to server to create a card.
     */
    createCard(data) {

        this.dbcardsService.createCard(data)
            .then(() => { this.getCards(); })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Edits a card. Sends information to server to edit a card.
     */
    editCard(cardId, data) {
        this.dbcardsService.editCard(cardId, data)
            .then(() => { this.getCards(); })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Deletes card.
     */
    deleteCard() {
        this.confirmService
            .confirm(this.translateService.instant('ADMIN.DELETE'),
                this.translateService.instant('DIALOG.MSG_DELETE', {name: this.currentCard.name}),
                this.translateService.instant('DIALOG.OK'))
            .subscribe(confirm => {

                if (confirm) {
                    this.dbcardsService.deleteCard(this.currentCard.id)
                        .then((r) => {

                            this.characters.forEach((x, i) => {
                                if (x.id === this.currentCard.id) {
                                    this.characters.splice(i, 1);
                                }
                            });
                            this.charactersList = this.characters;
                            this.searchForm.get('searchInput').setValue('');

                        })
                        .catch((err) => { console.error(err); });
                }
            });
    }

    /**
     * @desc
     *  On init class.
     *  - Get cards.
     */
    ngOnInit() {
        this.getCards();
    }

    constructor(public fb: FormBuilder, private dbcardsService: DbCardsService,
                private confirmService: ConfirmService, private cardDialogService: CardDialogService,
                private translateService: TranslateService) { }
}
