export class Attack {

    /**
     * @desc
     *  Name.
     * @type {string}
     */
    private _name: string;

    /**
     * @desc
     *  Hit damage.
     * @type {number}
     */
    private _damage: number;

    /**
     * @desc
     *  Returns attack name.
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * @desc
     *  Sets attack name.
     * @params {string} value - The value to set.
     */
    setName(value: string) {
        this._name = value;
    }

    /**
     * @desc
     *  Returns attack damage.
     * @returns {number}
     */
    get damage(): number {
        return this._damage;
    }

    /**
     * @desc
     *  Sets attack damage.
     * @params {number} value - The value to set.
     */
    setDamage(value: number) {
        this._damage = value;
    }
}
