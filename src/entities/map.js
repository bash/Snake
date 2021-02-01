/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Direction } from '../direction.js';
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

    /**
     * @param {Block} block
     * @param {number} direction
     */
    getNeighbour(block, direction) {
        switch (direction) {
            case 0:
                return new Block(block.x, block.y, block.color);
            case Direction.left:
                return new Block(this._wrappingDecrement(block.x), block.y, block.color);
            case Direction.right:
                return new Block(this._wrappingIncrement(block.x), block.y, block.color);
            case Direction.down:
                return new Block(block.x, this._wrappingIncrement(block.y), block.color);
            case Direction.up:
                return new Block(block.x, this._wrappingDecrement(block.y), block.color);
        }

        throw new Error(`Invalid direction ${direction}`);
    }

    _wrappingIncrement(value) {
        return value == this.size - 1
            ? 0
            : value + 1;
    }

    _wrappingDecrement(value) {
        return value == 0
            ? this.size - 1
            : value - 1;
    }
}