(function () {

    'use strict';

    define(['src/Map', 'src/Block'], function (Map, Block) {
        /**
         * @constructor
         */
        var First = function First() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(20);

            var center = Math.floor(this.map.size / 2);

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center, center);

            /**
             *
             * @type {number}
             */
            this.tickSpeed = 150;

            /**
             *
             * @type {number}
             */
            this.entryScore = 0;

            /**
             *
             * @type {number}
             */
            this.multiplier = 1;
        };

        return First;
    });
})();