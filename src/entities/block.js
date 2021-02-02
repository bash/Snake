/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Direction } from './../direction.js';

export class Block {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {string} color
     */
    constructor(x = 0, y = 0, color = '#22FF22') {
        /**
         *
         * @type {number}
         */
        this.x = x;

        /**
         *
         * @type {number}
         */
        this.y = y;

        /**
         *
         * @type {string}
         */
        this.color = color;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return '(' + this.x + '/' + this.y + ')';
    }

    /**
     *
     * @param {{x: *, y: *}} other
     * @returns {boolean}
     */
    equals(other) {
        return other.x === this.x && other.y === this.y;
    }
}