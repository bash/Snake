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

    move(map) {
        let partsBefore = [].concat(this.parts);

        this.parts.unshift(
            map.getNeighbour(this.parts[0], this.direction)
        );

        partsBefore.forEach((part, i) => {
            this.parts[i].color = part.color;
        });

        this.stash.push(partsBefore);
        this.parts.pop();
    }

    back() {
        this.parts = this.stash.pop();
    }

    /**
     *
     * @param {Block} block
     */
    grow(map, block) {
        if (block !== undefined) {
            let head = this.stash[this.stash.length - 1][0];

            this.parts.push(new Block(head.x, head.y, block.color));
        } else {
            this.parts.push(map.getNeighbour(this.head, Direction.getOpposite(this.direction)));
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