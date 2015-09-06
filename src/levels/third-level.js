/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Map } from '../entities/map';
import { Block } from '../entities/block';

export class ThirdLevel {
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
        this.tickSpeed = 125;

        /**
         *
         * @type {number}
         */
        this.entryScore = 30;

        /**
         *
         * @type {number}
         */
        this.multiplier = 2;

        let obstacles = this.map.obstacles;

        // Add some obstacles
        for (var i = 4; i < 16; i++) {
            obstacles.push( new Block(i, 5, '#ccc') );
        }

        obstacles.push( new Block(4, 6, '#ccc') );
        obstacles.push( new Block(15, 6, '#ccc') );

        for (var j = 4; j < 16; j++) {
            obstacles.push( new Block(j, 15, '#ccc') );
        }

        obstacles.push( new Block(4, 14, '#ccc') );
        obstacles.push( new Block(15, 14, '#ccc') );
    }
}