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
        return other.x == this.x && other.y == this.y;
    }

    /**
     *
     * @param {number} direction
     */
    getNeighbour(direction) {
        return Block.getNeighbour(this, direction);
    }

    /**
     *
     * @param {Block} block
     * @param {number} direction
     */
    static getNeighbour(block, direction) {
        switch (direction) {
            case 0:
                return new Block(block.x, block.y, block.color);
            case Direction.left:
                return new Block(block.x - 1, block.y, block.color);
            case Direction.right:
                return new Block(block.x + 1, block.y, block.color);
            case Direction.down:
                return new Block(block.x, block.y + 1, block.color);
            case Direction.up:
                return new Block(block.x, block.y - 1, block.color);
        }

        throw new Error(`Invalid direction ${direction}`);
    }
}