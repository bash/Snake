(function () {

    'use strict';

    define(function () {
        /**
         *
         * @param {Game} game
         * @constructor
         */
        var StopGameError = function StopGameError(game) {
            /**
             *
             * @type {Game}
             */
            this.game = game;
        };

        /**
         *
         * @returns {string}
         */
        StopGameError.prototype.toString = function () {
            return 'Game stopped after ' + this.game.ticks + ' ticks';
        };

        return StopGameError;
    });
})();