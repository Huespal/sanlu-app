import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DbCardsService } from '../dbcards.service';
import { Character } from './character';
import { cardTypes } from '../dbz-constants';

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
    cardTypes   = cardTypes;

    /**
     * @desc
     *  Card attack.
     * @param {Attack} attack - The card attack.
     */
    onAttack(attack) {
        alert(`Perform attack: ${attack.name}`);
    }

    /**
     * @desc
     *  Edits card.
     */
    onEdit() {
        console.log(`Edit card ${this.character.name}`);
        this.cardEvent.emit({character: this.character, remove: false});
    }

    /**
     * @desc
     *  Deletes card.
     */
    onDelete() {
        console.log(`Delete card ${this.character.name}`);
        this.cardEvent.emit({character: this.character, remove: true});
    }

    constructor() {}
}
