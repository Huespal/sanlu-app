import { Attack } from './attack';
export class Character {

    /**
     * @desc
     *  Id.
     * @type {number}
     */
    private _id: number;

    /**
     * @desc
     *  Remaining energy.
     * @type {number}
     */
    private _energy: number;

    /**
     * @desc
     *  Maximum energy.
     * @type {number}
     */
    private _maxEnergy: number;

    /**
     * @desc
     *  Character name.
     * @type {string}
     */
    private _name: string;

    /**
     * @desc
     *  Picture name.
     * @type {string}
     */
    private _picture: string;

    /**
     * @desc
     *  Series type (DB, Z or GT).
     * @type {number}
     */
    private _type: number;

    /**
     * @desc
     *  Status (Alive, dead).
     * @type {number}
     */
    private _status: number;

    /**
     * @desc
     *  Character attacks.
     * @type {Attack[]}
     */
    private _attacks: Attack[];

    /**
     * @desc
     *  Constructs a Character object.
     * @param {number} id           - The character id.
     * @param {string} name         - The character name.
     * @param {number} type         - The character type.
     * @param {number} energy       - The character energy.
     * @param {number} maxEnergy    - The character max energy.
     * @param {string} picture      - The character picture in base 64.
     * @param {number} status       - The character status.
     * @param {Attack[]} attacks    - The character attacks.
     */
    constructor(id: number, name: string, type: number, energy: number, maxEnergy: number,
                picture: string, status: number, attacks: Attack[]) {
        this.setId(id);
        this.setName(name);
        this.setType(type);
        this.setEnergy(energy);
        this.setMaxEnergy(maxEnergy);
        this.setPicture(picture);
        this.setAttacks(attacks);
        this.setStatus(status);
    }

    /**
     * @desc
     *  Get character id.
     * @returns {number}
     */
    get id(): number {
        return this._id;
    }

    /**
     * @desc
     *  Sets character id.
     * @params {number} value - The value to set.
     */
    setId(value: number) {
        this._id = value;
    }

    /**
     * @desc
     *  Returns character energy.
     * @returns {number}
     */
    get energy(): number {
        return this._energy;
    }

    /**
     * @desc
     *  Sets character energy.
     * @params {number} value - The value to set.
     */
    setEnergy(value: number) {
        this._energy = value;
    }

    /**
     * @desc
     *  Returns character max energy.
     * @returns {number}
     */
    get maxEnergy(): number {
        return this._maxEnergy;
    }

    /**
     * @desc
     *  Sets character max energy.
     * @params {number} value - The value to set.
     */
    setMaxEnergy(value: number) {
        this._maxEnergy = value;
    }

    /**
     * @desc
     *  Returns character name.
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * @desc
     *  Sets character name.
     * @params {string} value - The value to set.
     */
    setName(value: string) {
        this._name = value;
    }

    /**
     * @desc
     *  Returns character picture in base 64.
     * @returns {string}
     */
    get picture(): string {
        return this._picture;
    }

    /**
     * @desc
     *  Sets character picture.
     * @params {string} value - The value to set.
     */
    setPicture(value: string) {
        this._picture = value;
    }

    /**
     * @desc
     *  Returns character type.
     * @returns {number}
     */
    get type(): number {
        return this._type;
    }

    /**
     * @desc
     *  Sets character type.
     * @params {string} value - The value to set.
     */
    setType(value: number) {
        this._type = value;
    }

    /**
     * @desc
     *  Returns character status.
     * @returns {number}
     */
    get status(): number {
        return this._status;
    }

    /**
     * @desc
     *  Sets character status.
     * @params {string} value - The value to set.
     */
    setStatus(value: number) {
        this._status = value;
    }

    /**
     * @desc
     *  Returns character attacks.
     * @returns {Attack[]}
     */
    get attacks(): Attack[] {
        return this._attacks;
    }

    /**
     * @desc
     *  Sets character attacks.
     * @params {Attack[]} value - The value to set.
     */
    setAttacks(value: Attack[]) {
        this._attacks = value;
    }
}
