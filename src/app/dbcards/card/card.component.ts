import { Component, Input } from '@angular/core';
import { Character } from './character';
import { cardTypes } from '../dbz-constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() character: Character;

    /**
     * @desc
     *  Card types.
     * @type {Object}
     */
    cardTypes   = cardTypes;

    onAttack(attack) {
        alert(`Perform attack: ${attack.name}`);
    }

    constructor() { }
}
