import { Attack } from './attack';
export class Character {

    /**
     * @desc
     *  Remaining energy.
     * @type {number}
     */
    energy: number;

    /**
     * @desc
     *  Maximum energy.
     * @type {number}
     */
    maxEnergy: number;

    /**
     * @desc
     *  Character name.
     * @type {string}
     */
    name: string;

    /**
     * @desc
     *  Picture name.
     * @type {string}
     */
    picture: string;

    /**
     * @desc
     *  Series type (DB, Z or GT).
     * @type {number}
     */
    type: number;

    /**
     * @desc
     *  Status (Alive, dead).
     * @type {number}
     */
    status: number;

    /**
     * @desc
     *  Character attacks.
     * @type {Attack[]}
     */
    attacks: Attack[];
}