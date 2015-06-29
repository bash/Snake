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

    define(function () {
        /**
         *
         * @constructor
         */
        var RainbowGenerator = function RainbowGenerator() {
            /**
             *
             * @type {String[]}
             */
            this.colors = [
                '#8E7CC3',
                '#245096',
                '#6D9EEB',
                '#93C47D',
                '#E8E144',
                '#ECAB67',
                '#E06666',
                '#D4479C'
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