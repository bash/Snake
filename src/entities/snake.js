/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Direction } from '../direction';
import { Block } from './block';

export class Snake {
    /**
     *
     * @param {Block} firstBlock
     */
    constructor(firstBlock) {
        /**
         *
         * @type {Block[]}
         */
        this.parts = [ firstBlock ];

        /**
         *
         * @type {Array}
         */
        this.stash = [ this.parts ];

        this.stop();
    }

    stop() {
        this.direction = Direction.none;
    }

    move() {
        let partsBefore = [].concat(this.parts);

        partsBefore.forEach((part, i) => {
            this.parts[i].color = part.color;
        });

        this.stash.push(partsBefore);

        this.parts.unshift(
            this.parts[0].getNeighbour(this.direction)
        );

        this.parts.pop();
    }

    back() {
        this.parts = this.stash.pop();
    }

    /**
     *
     * @param {Block} block
     */
    grow(block) {
        if (block !== undefined) {
            let head = this.head;

            this.parts.push(new Block(head.x, head.y, block.color));
        } else {
            this.parts.push(this.head.getNeighbour(Direction.none));
        }
    }

    /**
     *
     * @returns {Block[]}
     */
    toArray() {
        return this.parts;
    }

    /**
     *
     * @returns {Block}
     */
    get head() {
        return this.parts[0];
    }

    /**
     *
     * @param {number} value
     */
    set direction(value) {
        this._direction = value;
    }

    /**
     *
     * @returns {number}
     */
    get direction() {
        return this._direction;
    }
}