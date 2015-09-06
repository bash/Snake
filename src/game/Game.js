/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Snake } from '../entities/snake';
import { Map } from '../entities/map';
import { Block } from '../entities/block';
import { RainbowGenerator } from '../rainbow-generator';
import { GamePlay } from './game-play';
import { StopGameError } from './stop-game-error';
import { OverDrawing } from '../drawings/over-drawing';
import { EventTarget } from '../events';
import { Direction } from '../direction';

export class Game {
    /**
     *
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        /**
         *
         * @type {Map}
         */
        this.map = new Map();

        /**
         *
         * @type {Canvas}
         */
        this.canvas = canvas;
        this.canvas.map = this.map;

        /**
         *
         * @type {Snake}
         */
        this.snake = new Snake(new Block(0, 0));

        /**
         *
         * @type {number}
         */
        this.speed = 100;

        /**
         *
         * @type {number}
         */
        this.score = 0;

        /**
         *
         * @type {GamePlay}
         */
        this.gamePlay = new GamePlay(this);

        /**
         *
         * @type {number}
         */
        this.ticks = 0;

        /**
         *
         * @type {number}
         */
        this.level = 1;

        /**
         *
         * @type {boolean}
         */
        this.over = false;

        /**
         *
         * @type {EventTarget}
         */
        this.onScoreUpdate = new EventTarget();

        /**
         *
         * @type {EventTarget}
         */
        this.onGameOver = new EventTarget();

        /**
         *
         * @type {EventTarget}
         */
        this.onLevelUpdate = new EventTarget();

        /**
         *
         * @type {EventTarget}
         */
        this.onStart = new EventTarget();
    }

    /**
     *
     * @param {number} direction
     */
    start(direction = Direction.none) {
        this.over = false;
        this.score = 0;
        this.level = 1;
        this.ticks = 0;

        this.snake.direction = direction;
        this.gamePlay.start();
        this.onStart.dispatch();

        this.doTick();
    }

    /**
     *
     * @returns {boolean}
     */
    hasStarted() {
        return this.ticks > 0;
    }

    doTick() {
        if (!this.isPaused()) {
            this.ticks++;

            try {
                this.gamePlay.doTick(this.ticks);
            } catch (e) {
                if (e instanceof StopGameError) {
                    this.gameOver();
                    return;
                }

                throw e;
            }
        }

        this.map.snake = this.snake;
        this.canvas.update();

        setTimeout(() => {
            this.doTick();
        }, this.speed);
    }

    gameOver() {
        this.setMap(OverDrawing.draw());
        this.setDirection(Direction.none);

        this.over = true;

        this.onGameOver.dispatch({ score: this.score, level: this.level, ticks: this.ticks });
    }

    /**
     *
     * @returns {boolean}
     */
    isPaused() {
        return this.snake.direction === 0;
    }

    pause() {
        this.setDirection(Direction.none);
    }

    /**
     *
     * @param {number} score
     */
    updateScore(score) {
        this.score = score;
        this.onScoreUpdate.dispatch({ score: score });
    }

    /**
     *
     * @param {number} level
     */
    updateLevel(level) {
        this.level = level;
        this.onLevelUpdate.dispatch({ level: level });
    }

    /**
     *
     * @param {Map} map
     */
    setMap(map) {
        this.map = map;
        this.canvas.map = map;
    }

    /**
     *
     * @param {number} direction
     * @returns {*}
     */
    setDirection(direction) {
        let snake = this.snake;

        if (!this.map.isVacantFromSnake(snake.head.getNeighbour(direction)) && direction !== Direction.none) {
            return false;
        }

        return snake.direction = direction;
    }
}