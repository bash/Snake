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
            this.tickSpeed = 130;

            /**
             *
             * @type {number}
             */
            this.entryScore = 0;

            /**
             *
             * @type {number}
             */
            this.multiplier = 2;

            // Add some obstacles
            for (var i = 4; i < 16; i++) {
                this.map.obstacles.push( new Block(i, 5, '#ccc') );
            }

            this.map.obstacles.push( new Block(4, 6, '#ccc') );
            this.map.obstacles.push( new Block(15, 6, '#ccc') );

            for (var j = 4; j < 16; j++) {
                this.map.obstacles.push( new Block(j, 15, '#ccc') );
            }

            this.map.obstacles.push( new Block(4, 14, '#ccc') );
            this.map.obstacles.push( new Block(15, 14, '#ccc') );
        };
    });
})();