(function () {

    'use strict';

    define(function () {
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

        return Block;
    });
})();