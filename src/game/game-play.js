/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { findBlockInArray, findDuplicate } from '../utils';
import { RainbowGenerator } from '../rainbow-generator';
import { LevelStack } from '../levels/level-stack';
import { StopGameError } from './stop-game-error';

export class GamePlay {
    /**
     *
     * @param {Game} game
     */
    constructor(game) {
        /**
         *
         * @type {Game}
         */
        this.game = game;

        /**
         *
         * @type {RainbowGenerator}
         */
        this.generator = new RainbowGenerator();

        /**
         *
         * @type {{}}
         */
        this.level = null;

        /**
         *
         * @type {LevelStack}
         */
        this.levelStack = new LevelStack();
    }

    /**
     *
     * @returns {Map}
     */
    get map() {
        return this.game.map;
    }

    /**
     *
     * @returns {Snake}
     */
    get snake() {
        return this.game.snake;
    }

    start() {
        this.levelStack.current = 0;
        this.startLevel();
    }

    startLevel() {
        var game = this.game;

        this.level = this.levelStack.get();
        this.game.updateLevel(this.levelStack.current + 1);

        // Set game presets from the level.
        game.snake.parts = [ this.level.initialBlock ];
        game.snake.stop();

        game.speed = this.level.tickSpeed;
        game.setMap(this.level.map);
        game.updateScore(game.score);

        // Get snake color from generator
        this.generator.rewind();
        this.game.snake.head.color = this.generator.get();
    }

    /**
     *
     * @param {number} tick
     */
    doTick(tick) {
        var game = this.game,
            snake = game.snake,
            map = this.map;

        if (this.levelStack.peek() && game.score >= this.levelStack.peek().entryScore) {
            this.levelStack.next();
            this.startLevel();
        }

        snake.move();
        map.snake = snake;

        this.spawnFood(tick);
        this.consumeFood();

        // Todo: create function for these lovely ifs

        // Test if the snake hit the border
        if (!map.contains(snake.head)) {
            snake.back();
            map.snake = snake;

            throw new StopGameError(game);
        }

        // Test if snake hit an obstacle
        if (findBlockInArray(map.obstacles, snake.head)) {
            snake.back();
            map.snake = snake;

            throw new StopGameError(game);
        }

        // Prevent the snake from biting itself
        if (findDuplicate(snake.parts, snake.parts[0])) {
            snake.back();
            map.snake = snake;

            throw new StopGameError(game);
        }
    }

    /**
     *
     * @param {number} tick
     */
    spawnFood(tick) {
        let map = this.map;

        // Spawn food every 20 ticks
        if (tick % 20 === 0 && map.food.length === 0) {
            let block = map.getRandomVacantBlock(this.generator.get());

            map.food = [ block ];
        }
    }

    consumeFood() {
        if (findBlockInArray(this.map.food, this.snake.head)) {
            let game = this.game;

            game.snake.grow(game.map.food[0]);
            game.map.food = [];

            game.updateScore(game.score + this.level.multiplier);
        }
    }
}