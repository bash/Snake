(function () {

    'use strict';

    define(['src/Block', 'src/Direction'], function (Block, Direction) {
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

        /**
         * Moves the snake 1 block into the current direction
         */
        Snake.fn.move = function () {
            this.lastParts = [].concat(this.parts);

            this.parts.unshift(
                Block.getNeighbour(this.parts[0], this.direction)
            );

            this.lastParts.forEach(function (part, i) {
                this.parts[i].color = part.color;
            }, this);

            this.parts.pop();
        };

        /**
         * Moves the snake back one step
         */
        Snake.fn.back = function(){
            this.parts = this.lastParts;
        };

        /**
         *
         * @param {Block} block
         */
        Snake.fn.grow = function (block) {
            if (block !== undefined) {
                block.x = this.lastParts[0].x;
                block.y = this.lastParts[0].y;

                this.parts.push(block);
            } else {
                this.parts.push(
                    Block.getNeighbour(this.parts[0], 0)
                );
            }
        };

        /**
         *
         * @param {Number} direction
         */
        Snake.fn.setDirection = function (direction) {
            this.direction = direction;
        };

        Object.defineProperty(Snake.fn, 'head', {
            get: function () {
                return this.parts[0];
            }
        });

        return Snake;
    });
})();