(function () {

    'use strict';

    define([
        'src/levels/First',
        'src/levels/Second',
        'src/levels/Third',
        'src/levels/Fourth'
    ], function (First, Second, Third, Fourth) {
        /**
         *
         * @constructor
         */
        var LevelStack = function () {
            /**
             *
             * @type {*[]}
             */
            this.levels = [
                new First(),
                new Second(),
                new Third(),
                new Fourth()
            ];

            this.current = 0;
        };

        LevelStack.prototype.next = function () {
            if (this.current < this.levels.length - 1) {
                this.current += 1;
            }
        };

        /**
         *
         * @returns {{}}
         */
        LevelStack.prototype.get = function () {
            return this.levels[this.current];
        };

        /**
         * @returns {{}}
         */
        LevelStack.prototype.peek = function () {
            if (this.levels[this.current + 1]) {
                return this.levels[this.current + 1];
            }
        };

        return LevelStack;
    });
})();