/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Map } from '../entities/map';
import { Block } from '../entities/block';

export class FirstLevel {
    constructor() {
        /**
         *
         * @type {Map}
         */
        this.map = new Map(20);

        let center = Math.floor(this.map.size / 2);

        /**
         *
         * @type {Block}
         */
        this.initialBlock = new Block(center, center);

        /**
         *
         * @type {number}
         */
        this.tickSpeed = 150;

        /**
         *
         * @type {number}
         */
        this.entryScore = 0;

        /**
         *
         * @type {number}
         */
        this.multiplier = 1;
    }
}