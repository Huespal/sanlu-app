import { Component, OnInit } from '@angular/core';
import { Character } from '../card/character';
import { DbCardsService } from '../dbcards.service';
import { FormBuilder, Validators } from '@angular/forms';
import { cardTypes, cardStatus } from '../dbz-constants';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../confirm/confirm.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin',
  providers: [ConfirmService, DbCardsService],
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
     *  Card types.
     * @type {Object}
     */
    cardTypes      = cardTypes;

    /**
     * @desc
     *  Card status.
     * @type {Object}
     */
    cardStatus      = cardStatus;

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
        cardName        : ['', Validators.required],
        cardPicture     : ['', Validators.required],
        cardType        : [this.cardTypes.Z, Validators.required],
        cardEnergy      : [1000, Validators.required],
        cardAttack1     : ['', Validators.required],
        cardAttack2     : ['', Validators.required],
        cardAttack3     : ['', Validators.required],
        hasExtraAttack  : [false, null],
        cardAttackExtra : ['', null]
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
        } else if (this.isEditing) {this.editCard(this.currentCard['_id']); }
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
     *  Resets and hides extra attack input.
     */
    onCancelExtraAttack() {
        this.cardForm.get('hasExtraAttack').setValue(false);
        this.cardForm.get('cardAttackExtra').setValue('');
    }

    /**
     * @desc
     *  Creates a card. Sends information to server to create a card.
     */
    createCard() {

        this.dbcardsService.createCard(this.prepareCardData())
            .then(() => {this.getCards(); })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Edits a card. Sends information to server to edit a card.
     */
    editCard(cardId) {
        this.dbcardsService.editCard(cardId, this.prepareCardData())
            .then(() => {this.getCards(); })
            .catch((err) => { console.error(err); });
    }

    prepareCardData() {
        const formControls  = this.cardForm.controls,
              data          = {
                    name        : formControls.cardName.value,
                    type        : formControls.cardType.value,
                    energy      : formControls.cardEnergy.value,
                    maxEnergy   : formControls.cardEnergy.value,
                    picture     : formControls.cardPicture.value,
                    status      : this.cardStatus.alive,
                    attacks     : [
                        {
                            name    : formControls.cardAttack1.value,
                            damage  : this.attackDamage1()
                        },
                        {
                            name    : formControls.cardAttack2.value,
                            damage  : this.attackDamage2()
                        },
                        {
                            name    : formControls.cardAttack3.value,
                            damage  : this.attackDamage3()
                        }
                    ]
              };

        if (formControls.hasExtraAttack.value) {

            data.attacks.push({
                name    : formControls.cardAttack2.value,
                damage  : this.attackDamageExtra()
            });
        }

        debugger;
        return data;
    }

    /**
     * Calculates damage for attack 1.
     * @returns {number}
     */
    attackDamage1() {

        // TODO: Calculate damage for attack 1 with energy.
        // this.cardForm.controls.cardEnergy.value
        return 10;
    }

    /**
     * Calculates damage for attack 2.
     * @returns {number}
     */
    attackDamage2() {

        // TODO: Calculate damage for attack 2 with energy.
        // this.cardForm.controls.cardEnergy.value
        return 10;
    }

    /**
     * Calculates damage for attack 3.
     * @returns {number}
     */
    attackDamage3() {

        // TODO: Calculate damage for attack 3 with energy.
        // this.cardForm.controls.cardEnergy.value
        return 10;
    }

    /**
     * Calculates damage for attack extra.
     * @returns {number}
     */
    attackDamageExtra() {

        // TODO: Calculate damage for attack extra with energy.
        // this.cardForm.controls.cardEnergy.value
        return 10;
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
     *  Gets card id from card component and stores it.
     * @param {Object} e - The event object.
     */
    handleCardEvent(e) {
        this.currentCard = e.character;
        if (e.remove) {this.deleteCard();
        } else { this.isEditing = true; }
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
                    this.dbcardsService.deleteCard(this.currentCard['_id'])
                        .then((r) => {

                            this.characters.forEach((x, i) => {
                                if (x._id === this.currentCard['_id']) {
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
                private confirmService: ConfirmService, private translateService: TranslateService) { }
}
