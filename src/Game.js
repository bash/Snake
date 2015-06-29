(function () {

    'use strict';

    var dependencies = ['src/Snake', 'src/Map', 'src/RainbowGenerator', 'src/Block', 'src/GamePlay', 'src/Direction'];

    define(dependencies, function (Snake, Map, RainbowGenerator, Block, GamePlay, Direction) {
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
            this.snake.setDirection(direction || 0);
            this.gamePlay.start();
            this.doTick();
        };

        Game.fn.doTick = function () {
            var _this = this;

            if (!this.isPaused()) {
                this.ticks += 1;
                this.gamePlay.doTick(this.ticks);
            }

            this.map.draw(this.snake.parts);
            this.canvas.update();

            window.setTimeout(function () {
                _this.doTick();
            }, this.speed);
        };

        /**
         *
         * @param {String} eventName
         * @param {{}} detail
         */
        Game.fn.fireEvent = function(eventName, detail){
            var event = new CustomEvent(eventName, {
                detail: detail
            });

            this.canvas.element.dispatchEvent(event);
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
            // Make some sort of custom event à la Google Chrome: game.onScoreUpdate.addListener(...)
            this.fireEvent('scoreUpdate', { score: score });
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