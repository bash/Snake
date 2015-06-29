(function () {

    'use strict';

    define(function () {
        /**
         *
         * @constructor
         */
        var RainbowGenerator = function RainbowGenerator() {
            /**
             * Got these from Google's pride heart ;-)
             *
             * @type {String[]}
             */
            this.colors = [
                '#F03B23', // Red
                '#FE8B14', // Orange
                '#F7D612', // Yellow
                '#009444', // Green
                '#219EA9', // Bluegreen
                '#214099', // Blue
                '#7D3D95'  // Violet
            ];

            /**
             *
             * @type {Number}
             */
            this.next = 0;
        };

        /**
         *
         * @returns {String}
         */
        RainbowGenerator.prototype.get = function() {
            var color = this.colors[this.next];

            this.next++;

            if (this.next == this.colors.length) {
                this.next = 0;
            }

            return color;
        };

        return RainbowGenerator;
    });
})();