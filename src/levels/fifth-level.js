/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Map } from '../entities/map';
import { Block } from '../entities/block';

export class FifthLevel {
    constructor() {
        /**
         *
         * @type {Map}
         */
        this.map = new Map(21);

        let center = this.map.getCenter();

        /**
         *
         * @type {Block}
         */
        this.initialBlock = new Block(center - 4, center);

        /**
         *
         * @type {number}
         */
        this.tickSpeed = 110;

        /**
         *
         * @type {number}
         */
        this.entryScore = 70;

        /**
         *
         * @type {number}
         */
        this.multiplier = 2;

        let obstacles = this.map.obstacles,
            size = this.map.size;

        for (let i = 0; i < size - 4; i++) {
            obstacles.push( new Block(i + 4, 9, '#ccc') );
            obstacles.push( new Block(i, 3, '#ccc') );
            obstacles.push( new Block(i, 16, '#ccc') );
        }
    }
}