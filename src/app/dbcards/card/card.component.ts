import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DbCardsService } from '../dbcards.service';
import { Character } from './character';
import { Skill } from './skill';
import { characterTypes } from '../dbz-constants';

@Component({
  selector: 'app-card',
  providers: [DbCardsService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    /**
     * @desc
     *  Character information.
     */
    @Input() character: Character;

    /**
     * @desc
     *  Skill information.
     */
    @Input() skill: Skill;

    /**
     * @desc
     *  Flag to detect is card administration.
     */
    @Input() isAdmin: false;

    /**
     * @desc
     *  Card event.
     *  - Edit card.
     *  - Update card.
     */
    @Output() cardEvent = new EventEmitter();

    /**
     * @desc
     *  Card types.
     * @type {Object}
     */
    cardTypes   = characterTypes;

    /**
     * @desc
     *  Card attack.
     * @param {Attack} attack - The card attack.
     */
    onAttack(attack) {
        this.cardEvent.emit({character: this.character, attack: attack});
    }

    /**
     * @desc
     *  Edits card.
     */
    onEdit() {
        this.cardEvent.emit({character: this.character, skill: this.skill, remove: false});
    }

    /**
     * @desc
     *  Deletes card.
     */
    onDelete() {
        this.cardEvent.emit({character: this.character, remove: true});
    }

    constructor() {}
}
