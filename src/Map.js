(function () {

    'use strict';

    /**
     *
     * @param {Number} lowest
     * @param {Number} highest
     * @returns {Number}
     */
    var rand = function (lowest, highest) {
        return Math.floor(Math.random() * highest) + lowest;
    };

    define(['src/Block'], function (Block) {
        /**
         *
         * @param {Number} size
         * @constructor
         */
        var Map = function Map(size) {
            /**
             *
             * @type {Number}
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
        };

        Map.fn = Map.prototype;

        /**
         *
         * @param {Block} coordinate
         * @returns {boolean}
         */
        Map.fn.contains = function (coordinate) {
            return coordinate.x < this.size && coordinate.y < this.size && coordinate.x > -1 && coordinate.y > -1;
        };

        /**
         *
         * @param {Array} coordinates
         */
        Map.fn.draw = function (coordinates) {
            this.snake = coordinates;
        };

        /**
         *
         * @returns {Array}
         */
        Map.fn.getBlocks = function () {
            return this.snake.concat(this.food).concat(this.obstacles);
        };

        /**
         *
         * @param {Block} block
         * @returns {Boolean}
         */
        Map.fn.isVacant = function (block) {
            return this.getBlocks().indexOf(block) === -1;
        };

        /**
         * @returns {Block}
         */
        Map.fn.getRandomBlock = function () {
            var x = rand(0, this.size),
                y = rand(0, this.size);

            return new Block(x, y);
        };

        /**
         *
         * @returns {Block}
         */
        Map.fn.getRandomVacantBlock = function () {
            var block = this.getRandomBlock();

            while (!this.isVacant(block)) {
                block = this.getRandomBlock();
            }

            return block;
        };

        return Map;
    });
})();