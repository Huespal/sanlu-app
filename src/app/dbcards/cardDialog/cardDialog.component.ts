import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Character } from '../card/character';
import { cardTypes, cardStatus } from '../dbz-constants';
import { FormBuilder, Validators } from '@angular/forms';
import { Attack } from '../card/attack';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './cardDialog.component.html',
  styleUrls: ['./cardDialog.component.scss']
})
export class CardDialogComponent implements OnInit {

    /**
     * @desc
     *  Card types.
     * @type {Object}
     */
    cardTypes   = cardTypes;

    /**
     * @desc
     *  Card status.
     * @type {Object}
     */
    cardStatus  = cardStatus;

    /**
     * @desc
     *  Dialog character.
     * @type {string}
     */
    character   = new Character(0, '', this.cardTypes.Z, 0, 0, '', 0, []);

    /**
     * @desc
     *  Card form.
     * @type {FormGroup}
     */
    cardForm    =  this.fb.group({
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
        cardAttackExtra : [{value: '', disabled: true}, null]
    });

    /**
     * @desc
     *  Create card form image preview.
     * @type {string}
     */
    imgPreview  = '';

    /**
     * @desc
     *  True if is creating card.
     * @type {boolean}
     */
    isCreating  = false;

    /**
     * @desc
     *  Callback to submit card form.
     *  - Create card.
     *  - Edit card.
     *  @params $event - The click event.
     */
    onSubmitForm() {
        this.dialogRef.close(this.prepareCardData());
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
            this.character.setPicture(picture);
            this.imgPreview = picture;
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
        this.character.setName(this.cardForm.controls.cardName.value);
    }

    /**
     * @desc
     *  Sets character energy to current card.
     */
    onChangeCardEnergy() {
        this.character.setEnergy(this.cardForm.controls.cardEnergy.value);
        this.character.setMaxEnergy(this.cardForm.controls.cardEnergy.value);
    }

    /**
     * @desc
     *  Sets character energy to current card.
     */
    onChangeCardType() {
        this.character.setType(this.cardForm.controls.cardType.value);
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
        this.character.setAttacks(attacks);
    }

    /**
     * @desc
     *  Prepares character server data.
     * @returns {Object}
     */
    prepareCardData() {

        const formControls  = this.cardForm.controls,
            attacks         = this.character.attacks,
            bodyAttacks     = [];

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
            name        : this.character.name,
            type        : this.character.type,
            energy      : this.character.energy,
            maxEnergy   : this.character.maxEnergy,
            picture     : this.character.picture,
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
     *  Initializes card dialog.
     */
    ngOnInit() {

        if (this.isCreating) {

            // Create
            this.cardForm.reset({
                cardType        : this.cardTypes.Z,
                cardEnergy      : 1000,
                hasExtraAttack  : false
            });
            this.imgPreview = '';
        } else {
            // Edit
            this.cardForm.controls['cardName'].setValue(this.character.name);
            this.cardForm.controls['cardType'].setValue(this.character.type);
            this.cardForm.controls['cardEnergy'].setValue(this.character.energy);
            this.cardForm.controls['cardAttacks']['controls'].forEach((validator, i) => {
                validator.controls['attack'].setValue(this.character.attacks[i].name);
            });
            const hasExtraAttack = this.character.attacks.length > 3;
            if (hasExtraAttack) {
                this.cardForm.controls['hasExtraAttack'].setValue(hasExtraAttack);
                this.cardForm.controls['cardAttackExtra'].setValue(this.character.attacks[3].name);
            }
            this.imgPreview = this.character.picture;
        }

        // Has extra attack subscriber.
        this.cardForm.get('hasExtraAttack').valueChanges.subscribe((newValue) => {
            if (newValue) {
                this.cardForm.get('cardAttackExtra').enable();
            } else {
                this.cardForm.get('cardAttackExtra').disable();
            }
        });
    }

    constructor(public fb: FormBuilder, public dialogRef: MdDialogRef<any>) {}
}
