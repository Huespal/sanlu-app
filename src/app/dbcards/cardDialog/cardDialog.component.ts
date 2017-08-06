import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Character } from '../card/character';
import { Skill } from '../card/skill';
import { characterTypes, characterStatus, skillTypes } from '../dbz-constants';
import { FormBuilder, Validators } from '@angular/forms';
import { Attack } from '../card/attack';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './cardDialog.component.html',
  styleUrls: ['./cardDialog.component.scss']
})
export class CardDialogComponent implements OnInit {

    /**
     * @desc
     *  Character types.
     * @type {Object}
     */
    characterTypes  = characterTypes;

    /**
     * @desc
     *  Skill types.
     * @type {Object}
     */
    skillTypes      = skillTypes;

    /**
     * @desc
     *  Skill types auxiliary.
     * @type {Array}
     */
    skillTypesAux   = [
        { id: this.skillTypes.energy,   name: this.translateService.instant('DB_CARDS.SKILLS.ENERGY')},
        { id: this.skillTypes.combo,    name: this.translateService.instant('DB_CARDS.SKILLS.COMBO')},
        { id: this.skillTypes.life,     name: this.translateService.instant('DB_CARDS.SKILLS.BEAN')},
        { id: this.skillTypes.extra,    name: this.translateService.instant('DB_CARDS.SKILLS.SPECIAL')},
        { id: this.skillTypes.buff,     name: this.translateService.instant('DB_CARDS.SKILLS.TRAIN')},
        { id: this.skillTypes.earth,    name: `${this.translateService.instant('DB_CARDS.SKILLS.DRAGON_BALLS')} 
                                               ${this.translateService.instant('DB_CARDS.SKILLS.EARTH')}`},
        { id: this.skillTypes.planet,   name: `${this.translateService.instant('DB_CARDS.SKILLS.DRAGON_BALLS')} 
                                               ${this.translateService.instant('DB_CARDS.SKILLS.NAMEK')}`},
        { id: this.skillTypes.universe, name: `${this.translateService.instant('DB_CARDS.SKILLS.DRAGON_BALLS')} 
                                               ${this.translateService.instant('DB_CARDS.SKILLS.UNIVERSE')}`}
    ];

    /**
     * @desc
     *  Card status.
     * @type {Object}
     */
    characterStatus = characterStatus;

    /**
     * @desc
     *  Dialog character.
     * @type {string}
     */
    character       = new Character(0, '', this.characterTypes.Z, 0, 0, '', 0, []);

    /**
     * @desc
     *  Dialog skill.
     * @type {string}
     */
    skill           = new Skill(0, '', this.skillTypes.energy, 0, 0, '');

    /**
     * @desc
     *  Character form.
     * @type {FormGroup}
     */
    characterForm    =  this.fb.group({
        characterName        : ['', Validators.required],
        characterType        : [this.characterTypes.Z, Validators.required],
        characterEnergy      : [1000, Validators.required],
        characterAttacks     : this.fb.array([
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
        hasExtraAttack       : [false, null],
        characterExtraAttack : [{value: '', disabled: true}, null]
    });

    /**
     * @desc
     *  Skill form.
     * @type {FormGroup}
     */
    skillForm       =  this.fb.group({
        skillName   : ['', Validators.required],
        skillType   : [this.skillTypes.energy, Validators.required],
        skillEnergy : [0, Validators.required],
        skillCombo  : [0, Validators.required]
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
        if (!!this.character) { this.dialogRef.close(this.prepareCharacterData()); }
        if (!!this.skill) { this.dialogRef.close(this.prepareSkillData()); }
    }

    /**
     * @desc
     *  Resets and hides extra attack input.
     */
    onCancelExtraAttack() {
        this.characterForm.get('hasExtraAttack').setValue(false);
        this.characterForm.get('characterExtraAttack').setValue('');
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
            if (!!this.character) { this.character.setPicture(picture); }
            if (!!this.skill) { this.skill.setPicture(picture); }
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
     *  Sets card name to current card.
     */
    onChangeCardName() {
        if (!!this.character) { this.character.setName(this.characterForm.controls.characterName.value); }
        if (!!this.skill) { this.skill.setName(this.skillForm.controls.skillName.value); }
    }

    /**
     * @desc
     *  Sets card energy to current card.
     */
    onChangeCardEnergy() {
        if (!!this.character) {
            this.character.setEnergy(this.characterForm.controls.characterEnergy.value);
            this.character.setMaxEnergy(this.characterForm.controls.characterEnergy.value);
        }
        if (!!this.skill) { this.skill.setEnergy(this.skillForm.controls.skillEnergy.value); }
    }

    /**
     * @desc
     *  Sets skill combo to current card.
     */
    onChangeCardCombo() {
        if (!!this.skill) { this.skill.setCombo(this.skillForm.controls.skillCombo.value); }
    }

    /**
     * @desc
     *  Sets character energy to current card.
     */
    onChangeCardType() {
        if (!!this.character) { this.character.setType(this.characterForm.controls.characterType.value); }
        if (!!this.skill) { this.skill.setType(this.skillForm.controls.skillType.value); }
    }

    /**
     * @desc
     *  Sets character attacks to current card.
     *  - Adds attack damage.
     */
    onChangeCardAttack() {
        const attacks = [];
        this.characterForm.controls.characterAttacks.value.forEach((input, i) => {
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
    prepareCharacterData() {

        const formControls  = this.characterForm.controls,
            attacks         = this.character.attacks,
            bodyAttacks     = [];

        // Adds extra attack.
        if (formControls.hasExtraAttack.value) {
            const extraAttack = new Attack();
            extraAttack.setName(formControls.characterExtraAttack.value);
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
            status      : this.characterStatus.alive,
            attacks     : bodyAttacks
        };
    }

    /**
     * @desc
     *  Prepares skill server data.
     * @returns {Object}
     */
    prepareSkillData() {

        return {
            name        : this.skill.name,
            type        : this.skill.type,
            energy      : this.skill.energy,
            maxEnergy   : this.skill.combo,
            picture     : this.skill.picture
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
        return this.characterForm.controls.characterEnergy.value * 0.08;
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

        if (!!this.character) {
            if (this.isCreating) {

                // Create.
                this.characterForm.reset({
                    characterType        : this.characterTypes.Z,
                    characterEnergy      : 1000,
                    hasExtraAttack  : false
                });
                this.imgPreview = '';
            } else {

                // Edit character.
                this.characterForm.controls['characterName'].setValue(this.character.name);
                this.characterForm.controls['characterType'].setValue(this.character.type);
                this.characterForm.controls['characterEnergy'].setValue(this.character.energy);
                this.characterForm.controls['characterAttacks']['controls'].forEach((validator, i) => {
                    validator.controls['attack'].setValue(this.character.attacks[i].name);
                });
                const hasExtraAttack = this.character.attacks.length > 3;
                if (hasExtraAttack) {
                    this.characterForm.controls['hasExtraAttack'].setValue(hasExtraAttack);
                    this.characterForm.controls['characterExtraAttack'].setValue(this.character.attacks[3].name);
                }
                this.imgPreview = this.character.picture;
            }

            // Has extra attack subscriber.
            this.characterForm.get('hasExtraAttack').valueChanges.subscribe((newValue) => {
                if (newValue) {
                    this.characterForm.get('characterExtraAttack').enable();
                } else {
                    this.characterForm.get('characterExtraAttack').disable();
                }
            });
        } else if (!!this.skill) {

            // Edit skill.
            this.skillForm.controls['skillName'].setValue(this.skill.name);
            this.skillForm.controls['skillType'].setValue(this.skill.type);
            this.skillForm.controls['skillEnergy'].setValue(this.skill.energy);
            this.skillForm.controls['skillCombo'].setValue(this.skill.combo);
            this.imgPreview = this.skill.picture;
        }
    }

    constructor(public fb: FormBuilder, public dialogRef: MdDialogRef<any>,
                private translateService: TranslateService) {}
}
