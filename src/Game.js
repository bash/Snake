(function () {

    'use strict';

    var dependencies = [
        'src/Snake',
        'src/Map',
        'src/RainbowGenerator',
        'src/Block',
        'src/GamePlay',
        'src/StopGameError',
        'src/drawings/over',
        'src/Events'
    ];

    define(dependencies, function (Snake, Map, RainbowGenerator, Block, GamePlay, StopGameError, over, Target) {
        /**
         *
         * @param {Canvas} canvas
         * @param {Number} speed
         * @param {Number} mapSize
         * @constructor
         */
        var Game = function Game(canvas) {
            /**
             *
             * @type {Snake}
             */
            this.snake = new Snake(new Block(0, 0));

            /**
             *
             * @type {Number}
             */
            this.speed = 100;

            /**
             *
             * @type {Map}
             */
            this.map = new Map();

            /**
             *
             * @type {Number}
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
             * @type {Target}
             */
            this.onScoreUpdate = new Target();

            /**
             *
             * @type {Target}
             */
            this.onGameOver = new Target();

            /**
             *
             * @type {Target}
             */
            this.onLevelUpdate = new Target();

            /**
             *
             * @type {Target}
             */
            this.onStart = new Target();

            /**
             *
             * @type {Canvas}
             */
            this.canvas = canvas;
            this.canvas.map = this.map;
        };

        Game.fn = Game.prototype;

        /**
         *
         * @param {Number} direction
         */
        Game.fn.start = function (direction) {
            this.over = false;
            this.score = 0;
            this.level = 1;
            this.ticks = 0;

            this.snake.setDirection(direction || 0);
            this.gamePlay.start();
            this.onStart.dispatch();

            this.doTick();
        };

        /**
         *
         * @returns {boolean}
         */
        Game.fn.hasStarted = function() {
            return this.ticks > 0;
        };

        Game.fn.doTick = function () {
            var _this = this;

            if (!this.isPaused()) {
                this.ticks += 1;

                try {
                    this.gamePlay.doTick(this.ticks);
                } catch (e) {
                    if (e instanceof StopGameError) {
                        this.gameOver();
                        return;
                    } else {
                        throw e;
                    }
                }
            }

            this.map.draw(this.snake.parts);
            this.canvas.update();

            window.setTimeout(function () {
                _this.doTick();
            }, this.speed);
        };

        Game.fn.gameOver = function() {
            this.canvas.map = over();
            this.canvas.update();
            this.over = true;

            this.onGameOver.dispatch({ score: this.score, level: this.level });
        };

        /**
         *
         * @returns {Boolean}
         */
        Game.fn.isPaused = function(){
            return this.snake.direction === 0;
        };

        Game.fn.pause = function(){
            this.setDirection(0);
        };

        /**
         *
         * @param {Number} score
         */
        Game.fn.updateScore = function(score) {
            this.score = score;
            this.onScoreUpdate.dispatch({ score: score });
        };

        /**
         *
         * @param {Number} level
         */
        Game.fn.updateLevel = function(level) {
            this.level = level;
            this.onLevelUpdate.dispatch({ level: level });
        };

        /**
         *
         * @param {Map} map
         */
        Game.fn.setMap = function (map) {
            this.map = map;
            this.canvas.map = map;
        };

        /**
         *
         * @param {Number} direction
         * @returns {Boolean}
         */
        Game.fn.setDirection = function(direction) {
            if (!this.map.isVacantBySnake(Block.getNeighbour(this.snake.parts[0], direction)) && direction !== 0) {
                return false;
            }

            return this.snake.setDirection(direction);
        };

        return Game;
    });
})();