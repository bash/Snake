(function () {

    'use strict';

    define(function () {
        /**
         *
         * @param {HTMLCanvasElement} element
         * @param {Grid} grid
         * @constructor
         */
        var Canvas = function Canvas(element, grid) {
            /**
             *
             * @type {HTMLCanvasElement}
             */
            this.element = element;

            /**
             *
             * @type {Grid}
             */
            this.grid = grid;

            /**
             *
             * @type {number}
             */
            this.blockSize = 30;
        };


        Canvas.prototype.update = function () {
            var ctx = this.element.getContext('2d');
            // Reset pointer
            ctx.clearRect(0, 0, this.element.width, this.element.height);

            // Update canvas size
            this.element.width = this.element.height = this.grid.size * this.blockSize;

            this.grid.getBlocks().forEach(function (block) {
                ctx.fillStyle = block.color;

                ctx.fillRect(block.x * this.blockSize, block.y * this.blockSize, this.blockSize, this.blockSize);
            }, this);
        };

        return Canvas;
    });
})();