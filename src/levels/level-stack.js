/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { FirstLevel } from './first-level';
import { SecondLevel } from './second-level';
import { ThirdLevel } from './third-level';
import { FourthLevel } from './fourth-level';
import { FifthLevel } from './fifth-level';

export class LevelStack {
    constructor() {
        /**
         *
         * @type {*[]}
         */
        this.levels = [
            new FirstLevel(),
            new SecondLevel(),
            new ThirdLevel(),
            new FourthLevel(),
            new FifthLevel()
        ];

        this.current = 0;
    }

    next() {
        if (this.current < this.levels.length - 1) {
            this.current++;
        }
    }

    /**
     *
     * @returns {*}
     */
    get() {
        return this.levels[this.current];
    }

    /**
     *
     * @returns {*}
     */
    peek() {
        if (this.levels[this.current + 1]) {
            return this.levels[this.current + 1];
        }
    }
}