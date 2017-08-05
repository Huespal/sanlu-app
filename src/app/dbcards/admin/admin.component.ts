import { Component, OnInit } from '@angular/core';
import { Character } from '../card/character';
import { DbCardsService } from '../dbcards.service';
import { FormBuilder, Validators } from '@angular/forms';
import { cardTypes, cardStatus } from '../dbz-constants';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../confirm/confirm.service';
import 'rxjs/add/operator/toPromise';
import { Attack } from '../card/attack';

@Component({
  selector: 'app-admin',
  providers: [ConfirmService, DbCardsService],
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
     *  Card status.
     * @type {Object}
     */
    cardStatus      = cardStatus;

    /**
     * @desc
     *  Current card data.
     * @type {Character}
     */
    currentCard     = new Character(0, '', this.cardTypes.Z, 0, 0, '', 0, []);

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
        cardType        : [this.cardTypes.Z, Validators.required],
        cardEnergy      : [1000, Validators.required],
        cardAttacks     : this.fb.array([
            this.fb.group({
                attack : ['', Validators.required],
            }),
            this.fb.group({
                attack : ['', Validators.required],
            }),
            this.fb.group({
                attack : ['', Validators.required],
            })
        ]),
        hasExtraAttack  : [false, null],
        cardAttackExtra : ['', null]
    });

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
     *  Create card form image preview.
     * @type {string}
     */
    formImgPreview  = '';

    /**
     * @desc
     *  Callback to submit card form.
     *  - Create card.
     *  - Edit card.
     *  @params $event - The click event.
     */
    onSubmitForm() {
        if (this.isCreating) {this.createCard();
        } else if (this.isEditing) {this.editCard(this.currentCard.id); }
    }

    /**
     * @desc
     *  Callback to allow create card form.
     *  @params $event - The click event.
     */
    onShowCreateCardForm() {
        this.cardForm.reset({
            cardType        : this.cardTypes.Z,
            cardEnergy      : 1000,
            hasExtraAttack  : false
        });
        this.formImgPreview = '';
        this.isCreating     = true;
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
     *  Reads image file and sets picture to current card in base64.
     *  @params {event} - The change event.
     */
    onChangeCardPicture(event) {
        const img = new Image();

        img.onload = () => {
            const picture = this.imageToDataUri(img);
            this.currentCard.setPicture(picture);
            this.formImgPreview = picture;
        };
        img.src = URL.createObjectURL(event.target.files[0]);
    }

    /**
     * @desc
     *  Resizes image.
     *  @params {event} - The change event.
     */
    calculateAspectRatioFit(img, maxWidth, maxHeight) {

        const srcWidth  = img.width,
              srcHeight = img.height,
              ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        img.width = srcWidth * ratio;
        img.height = srcHeight * ratio;
    }

    /**
     * @desc
     *  Reads image file and sets picture to current card in base64.
     *  @params {event} - The change event.
     */
    imageToDataUri(img) {

        const canvas = document.createElement('canvas'),
              ctx    = canvas.getContext('2d'),
              maxWidth  = 175,
              maxHeight = 175;

        if (img.width > maxWidth || img.height > maxHeight) {
            this.calculateAspectRatioFit(img, maxWidth, maxHeight);
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return canvas.toDataURL();
    }

    /**
     * @desc
     *  Sets character name to current card.
     */
    onChangeCardName() {
        this.currentCard.setName(this.cardForm.controls.cardName.value);
    }

    /**
     * @desc
     *  Sets character energy to current card.
     */
    onChangeCardEnergy() {
        this.currentCard.setEnergy(this.cardForm.controls.cardEnergy.value);
        this.currentCard.setMaxEnergy(this.cardForm.controls.cardEnergy.value);
    }

    /**
     * @desc
     *  Sets character energy to current card.
     */
    onChangeCardType() {
        this.currentCard.setType(this.cardForm.controls.cardType.value);
    }

    /**
     * @desc
     *  Sets character attacks to current card.
     *  - Adds attack damage.
     */
    onChangeCardAttack() {
        const attacks = [];
        this.cardForm.controls.cardAttacks.value.forEach((input, i) => {
            const attack = new Attack(),
                  fn     = `attackDamage${i + 1}`;
            attack.setName(input.attack);
            attack.setDamage(this[fn]());
            attacks.push(attack);
        });
        this.currentCard.setAttacks(attacks);
    }

    /**
     * @desc
     *  Creates a card. Sends information to server to create a card.
     */
    createCard() {

        this.dbcardsService.createCard(this.prepareCardData())
            .then(() => {
                this.isCreating = false;
                this.getCards();
            })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Edits a card. Sends information to server to edit a card.
     */
    editCard(cardId) {
        this.dbcardsService.editCard(cardId, this.prepareCardData())
            .then(() => {
                this.isEditing = false;
                this.getCards();
            })
            .catch((err) => { console.error(err); });
    }

    /**
     * @desc
     *  Prepares character server data.
     * @returns {Object}
     */
    prepareCardData() {

        const formControls  = this.cardForm.controls,
              attacks       = this.currentCard.attacks,
              bodyAttacks   = [];

        // Adds extra attack.
        if (formControls.hasExtraAttack.value) {
            const extraAttack = new Attack();
            extraAttack.setName(formControls.cardAttackExtra.value);
            extraAttack.setDamage(this.attackDamageExtra());
            attacks.push(extraAttack);
        }

       // Refactor attacks to match server needs.
        attacks.forEach((item) => {
            const attack = {
                name    : item.name,
                damage  : item.damage
            };
            bodyAttacks.push(attack);
        });

       return {
            name        : this.currentCard.name,
            type        : this.currentCard.type,
            energy      : this.currentCard.energy,
            maxEnergy   : this.currentCard.maxEnergy,
            picture     : this.currentCard.picture,
            status      : this.cardStatus.alive,
            attacks     : bodyAttacks
       };
    }

    /**
     * Calculates damage for attack 1.
     * @returns {number}
     */
    attackDamage1() {
        return 0;
    }

    /**
     * Calculates damage for attack 2.
     * @returns {number}
     */
    attackDamage2() {
        return this.cardForm.controls.cardEnergy.value * 0.08;
    }

    /**
     * Calculates damage for attack 3.
     * @returns {number}
     */
    attackDamage3() {
        return 0;
    }

    /**
     * Calculates damage for attack extra.
     * @returns {number}
     */
    attackDamageExtra() {
        return 0;
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
     *  Gets card id from card component and stores it.
     * @param {Object} e - The event object.
     */
    handleCardEvent(e) {
        this.currentCard = e.character;
        if (e.remove) {this.deleteCard();
        } else {

            this.cardForm.controls['cardName'].setValue(this.currentCard.name);
            this.cardForm.controls['cardType'].setValue(this.currentCard.type);
            this.cardForm.controls['cardEnergy'].setValue(this.currentCard.energy);
            this.cardForm.controls['cardAttacks']['controls'].forEach((validator, i) => {
                validator.controls['attack'].setValue(this.currentCard.attacks[i].name);
            });
            const hasExtraAttack = this.currentCard.attacks.length > 3;
            if (hasExtraAttack) {
                this.cardForm.controls['hasExtraAttack'].setValue(hasExtraAttack);
                this.cardForm.controls['cardAttackExtra'].setValue(this.currentCard.attacks[3].name);
            }
            this.isCreating = false;
            this.isEditing = true;
        }
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
                private confirmService: ConfirmService, private translateService: TranslateService) { }
}
