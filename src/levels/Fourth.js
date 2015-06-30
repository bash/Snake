(function () {

    'use strict';

    define(['src/Map', 'src/Block'], function (Map, Block) {
        /**
         * @constructor
         */
        return function Fourth() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(21);

            var center = Math.floor(this.map.size / 2);

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center - 4, center);

            /**
             *
             * @type {number}
             */
            this.tickSpeed = 125;

            /**
             *
             * @type {number}
             */
            this.entryScore = 50;

            /**
             *
             * @type {number}
             */
            this.multiplier = 2;

            // Add some obstacles
            for (var i = 4; i < this.map.size - 3; i++) {
                this.map.obstacles.push( new Block(center, i, '#ccc') );
            }

            for (i = 4; i < this.map.size - 4; i++) {
                this.map.obstacles.push( new Block(i, 4, '#ccc') );
            }

            for (i = 4; i < this.map.size - 4; i++) {
                this.map.obstacles.push( new Block(i, this.map.size - 4, '#ccc') );
            }
        };
    });
})();