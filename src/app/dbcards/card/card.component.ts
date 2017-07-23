import {Component} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    /**
     * @desc
     *  Remaining energy.
     * @type {number}
     */
    energy      = 1000;

    /**
     * @desc
     *  Maximum energy.
     * @type {number}
     */
    maxEnergy   = 1000;

    /**
     * @desc
     *  Character name.
     * @type {string}
     */
    name        = 'Cor Petit';

    /**
     * @desc
     *  Picture name.
     * @type {string}
     */
    picture     = 'cor_petit';

    /**
     * @desc
     *  Character attacks.
     * @type {Array}
     */
    attacks     = [
        {
            name    : 'Raig malèfic'
        },
        {
            name    : 'Combo',
            damage  : 80
        },
        {
            name    : 'Gegant'
        }
    ];

    onAttack(attack) {
        alert(`Perform attack: ${attack.name}`);
    }

    constructor() { }
}
