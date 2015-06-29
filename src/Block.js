(function () {

    'use strict';

    define(['src/Direction'], function (Direction) {
        /**
         *
         * @param {Number} x
         * @param {Number} y
         * @param {String} color
         * @constructor
         */
        var Block = function Block(x, y, color) {
            /**
             *
             * @type {Number}
             */
            this.x = x || 0;

            /**
             *
             * @type {Number}
             */
            this.y = y || 0;

            /**
             *
             * @type {String}
             */
            this.color = color || '#22FF22';
        };

        /**
         *
         * @returns {String}
         */
        Block.prototype.toString = function () {
            return '(' + this.x + '/' + this.y + ')';
        };

        /**
         *
         * @param {{x: *, y: *}} other
         * @returns {boolean}
         */
        Block.prototype.equals = function (other) {
            return other.x == this.x && other.y == this.y;
        };

        /**
         *
         * @param {Block} block
         * @param {Number} direction
         */
        Block.getNeighbour = function(block, direction) {
            switch (direction) {
                case 0:
                    return new Block(block.x, block.y);
                case Direction.left:
                    return new Block(block.x - 1, block.y);
                case Direction.right:
                    return new Block(block.x + 1, block.y);
                case Direction.down:
                    return new Block(block.x, block.y + 1);
                case Direction.up:
                    return new Block(block.x, block.y - 1);
            }
        };

        return Block;
    });
})();