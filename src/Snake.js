(function () {

    'use strict';

    define(['src/Block'], function (Block) {
        /**
         *
         * @constructor
         * @param {Block} block
         */
        var Snake = function Snake(block) {
            /**
             *
             * @type {Array}
             */
            this.parts = [block];

            /**
             *
             * @type {Array}
             */
            this.lastParts = this.parts;

            /**
             *
             * @type {Number}
             */
            this.direction = 0;
        };

        Snake.fn = Snake.prototype;

        Snake.fn.stop = function () {
            this.direction = 0;
        };

        Snake.fn.move = function () {
            this.lastParts = [].concat(this.parts);

            this.parts.unshift(
                this._coordinateInDirection(this.parts[0], this.direction)
            );

            this.lastParts.forEach(function (part, i) {
                this.parts[i].color = part.color;
            }, this);

            this.parts.pop();
        };

        /**
         *
         * @param {Block} block
         */
        Snake.fn.grow = function (block) {
            if (block !== undefined) {
                this.parts.unshift(block);
            } else {
                this.parts.unshift(
                    this._coordinateInDirection(this.parts[0], 0)
                );
            }
        };

        /**
         *
         * @param {Block} block
         * @param {Number} direction
         * @private
         */
        Snake.fn._coordinateInDirection = function (block, direction) {
            switch (direction) {
                case 0:
                    return new Block(block.x, block.y);
                case Snake.DIRECTION_LEFT:
                    return new Block(block.x - 1, block.y);
                case Snake.DIRECTION_RIGHT:
                    return new Block(block.x + 1, block.y);
                case Snake.DIRECTION_DOWN:
                    return new Block(block.x, block.y + 1);
                case Snake.DIRECTION_UP:
                    return new Block(block.x, block.y - 1);
            }
        };

        Snake.DIRECTION_UP = 1;
        Snake.DIRECTION_DOWN = 2;
        Snake.DIRECTION_LEFT = 3;
        Snake.DIRECTION_RIGHT = 4;

        return Snake;
    });
})();