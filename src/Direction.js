(function(){

    'use strict';

    define(function(){
        var Direction = {};

        Object.defineProperty(Direction, 'up', {
            value: 1
        });

        Object.defineProperty(Direction, 'down', {
            value: -1
        });

        Object.defineProperty(Direction, 'left', {
            value: 2
        });

        Object.defineProperty(Direction, 'right', {
            value: -2
        });

        /**
         *
         * @param {Number} direction
         */
        Direction.getOpposite = function(direction) {
            return -direction;
        };

        /**
         *
         * @param {Number} a
         * @param {Number} b
         */
        Direction.areOpposites = function(a, b){
            return a == -b && a != b != 0;
        };

        return Direction;
    });
})();