(function () {

    'use strict';

    define(['src/Map', 'src/Block'], function (Map, Block) {
        /**
         * @constructor
         */
        return function Second() {
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
            this.tickSpeed = 110;

            /**
             *
             * @type {number}
             */
            this.entryScore = 20;

            /**
             *
             * @type {number}
             */
            this.multiplier = 2;
        };
    });
})();