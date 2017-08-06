export class Skill {

    /**
     * @desc
     *  Id.
     * @type {number}
     */
    private _id: number;

    /**
     * @desc
     *  Name.
     * @type {string}
     */
    private _name: string;

    /**
     * @desc
     *  Skill type.
     * @type {number}
     */
    private _type: number;

    /**
     * @desc
     *  Energy.
     * @type {number}
     */
    private _energy: number;

    /**
     * @desc
     *  Character name.
     * @type {number}
     */
    private _combo: number;

    /**
     * @desc
     *  Picture name.
     * @type {string}
     */
    private _picture: string;

    /**
     * @desc
     *  Constructs a Character object.
     * @param {number} id           - The character id.
     * @param {string} name         - The character name.
     * @param {number} type         - The character type.
     * @param {number} energy       - The character energy.
     * @param {number} combo        - The character combo.
     * @param {string} picture      - The character picture in base 64.
     */
    constructor(id: number, name: string, type: number, energy: number, combo: number, picture: string) {
        this.setId(id);
        this.setName(name);
        this.setType(type);
        this.setEnergy(energy);
        this.setCombo(combo);
        this.setPicture(picture);
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
     *  Sets id.
     * @params {number} value - The value to set.
     */
    setId(value: number) {
        this._id = value;
    }

    /**
     * @desc
     *  Returns name.
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * @desc
     *  Sets name.
     * @params {string} value - The value to set.
     */
    setName(value: string) {
        this._name = value;
    }

    /**
     * @desc
     *  Returns type.
     * @returns {number}
     */
    get type(): number {
        return this._type;
    }

    /**
     * @desc
     *  Sets type.
     * @params {string} value - The value to set.
     */
    setType(value: number) {
        this._type = value;
    }

    /**
     * @desc
     *  Returns energy.
     * @returns {number}
     */
    get energy(): number {
        return this._energy;
    }

    /**
     * @desc
     *  Sets energy.
     * @params {number} value - The value to set.
     */
    setEnergy(value: number) {
        this._energy = value;
    }

    /**
     * @desc
     *  Returns combo.
     * @returns {number}
     */
    get combo(): number {
        return this._combo;
    }

    /**
     * @desc
     *  Sets combo.
     * @params {number} value - The value to set.
     */
    setCombo(value: number) {
        this._combo = value;
    }

    /**
     * @desc
     *  Returns picture in base 64.
     * @returns {string}
     */
    get picture(): string {
        return this._picture;
    }

    /**
     * @desc
     *  Sets picture.
     * @params {string} value - The value to set.
     */
    setPicture(value: string) {
        this._picture = value;
    }
}
