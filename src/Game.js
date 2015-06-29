(function () {

    'use strict';

    /**
     *
     * @param {Array} haystack
     * @param {*} needle
     */
    var findInArray = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].equals(needle)) {
                return haystack[i];
            }
        }
    };

    var dependencies = ['src/Snake', 'src/Map', 'src/RainbowGenerator', 'src/Block', 'src/StopGameError'];

    define(dependencies, function(Snake, Map, RainbowGenerator, Block, StopGameError){
        /**
         *
         * @param {Canvas} canvas
         * @param {Number} speed
         * @param {Number} gridSize
         * @constructor
         */
        var Game = function Game(canvas, speed, gridSize) {
            /**
             *
             * @type {Snake}
             */
            this.snake = new Snake(new Block(0, 0));

            /**
             *
             * @type {Number}
             */
            this.speed = speed || 100;

            /**
             *
             * @type {Map}
             */
            this.grid = new Map(gridSize || 25);

            /**
             *
             * @type {Number}
             */
            this.score = 0;

            /**
             *
             * @type {RainbowGenerator}
             */
            this.generator = new RainbowGenerator();

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
            this.canvas.grid = this.grid;
        };

        Game.fn = Game.prototype;

        /**
         *
         * @param {Number} direction
         */
        Game.fn.start = function (direction) {
            this.snake.parts[0].color = this.generator.get();
            this.snake.direction = direction;
            this.doTick();
        };


        Game.fn.doTick = function () {
            var _this = this;

            this.ticks += 1;
            this.snake.move();
            this.grid.draw(this.snake.parts);
            this.canvas.update();

            if (this.ticks % 20 == 0 && this.grid.food.length === 0) {
                var block = this.grid.getRandomVacantBlock();
                block.color = this.generator.get();

                this.grid.food = [ block ];
            }

            if (findInArray(this.grid.food, this.snake.parts[0])) {
                this.snake.grow(this.grid.food[0]);
                this.grid.food = [];
            }

            if (!this.grid.contains(this.snake.parts[0])) {
                this.snake.parts = this.snake.lastParts;

                this.grid.draw(this.snake.parts);
                this.canvas.update();

                throw new StopGameError(this);
            }

            window.setTimeout(function () {
                _this.doTick();
            }, this.speed);
        };

        return Game;
    });
})();