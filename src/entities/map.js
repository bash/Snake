/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { random, findBlockInArray } from '../utils.js';
import { Block } from './block.js';
import { Snake } from './snake.js';

export class Map {
    /**
     *
     * @param {number} size
     */
    constructor(size) {
        /**
         *
         * @type {number}
         */
        this.size = size;

        /**
         *
         * @type {Array}
         */
        this.snake = [];

        /**
         *
         * @type {Array}
         */
        this.obstacles = [];

        /**
         *
         * @type {Array}
         */
        this.food = [];
    }

    /**
     *
     * @param {Block} block
     * @returns {boolean}
     */
    contains(block) {
        return block.x < this.size && block.y < this.size && block.x > -1 && block.y > -1;
    }

    /**
     *
     * @param {Snake|Array} snake
     */
    set snake(snake) {
        if (snake instanceof Snake) {
            snake = snake.toArray();
        }

        this._snake = snake;
    }

    /**
     *
     * @returns {Snake|Array}
     */
    get snake() {
        return this._snake;
    }

    /**
     *
     * @returns {Block[]}
     */
    get blocks() {
        return this.snake.concat(this.food).concat(this.obstacles);
    }

    /**
     *
     * @param {Block} block
     * @returns {boolean}
     */
    isVacant(block) {
        return !findBlockInArray(this.blocks, block);
    }

    /**
     *
     * @param {Block} block
     * @returns {boolean}
     */
    isVacantFromSnake(block) {
        return !findBlockInArray(this.snake, block);
    }

    /**
     *
     * @returns {Block}
     */
    getRandomBlock(color) {
        let x = random(0, this.size),
            y = random(0, this.size);

        return new Block(x, y, color);
    }

    /**
     *
     * @returns {Block}
     */
    getRandomVacantBlock(color) {
        let block = this.getRandomBlock(color);

        while (!this.isVacant(block)) {
            block = this.getRandomBlock(color);
        }

        return block;
    }

    /**
     *
     * @returns {number}
     */
    getCenter() {
        return Math.floor(this.size / 2);
    }
}