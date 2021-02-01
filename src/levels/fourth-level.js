/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Map } from '../entities/map';
import { Block } from '../entities/block';
import { WALL_COLOR } from '../color';

export class FourthLevel {
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
        this.tickSpeed = 125;

        /**
         *
         * @type {number}
         */
        this.entryScore = 50;

        /**
         *
         * @type {number}
         */
        this.multiplier = 2;

        let obstacles = this.map.obstacles,
            size = this.map.size;

        // Add some obstacles
        for (let i = 4; i < size - 3; i++) {
            obstacles.push( new Block(center, i, WALL_COLOR) );
        }

        for (let i = 4; i < size - 4; i++) {
            obstacles.push( new Block(i, 4, WALL_COLOR) );
        }

        for (let i = 4; i < size - 4; i++) {
            obstacles.push( new Block(i, size - 4, WALL_COLOR) );
        }
    }
}