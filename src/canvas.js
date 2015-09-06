/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Canvas {
    /**
     *
     * @param {HTMLCanvasElement} $
     * @param {Map} map
     * @param {number} blockSize
     */
    constructor($, map = null, blockSize = 30) {
        /**
         *
         * @type {HTMLCanvasElement}
         */
        this.$ = $;

        /**
         *
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.$.getContext('2d');

        /**
         *
         * @type {Map}
         */
        this.map = map;

        /**
         *
         * @type {number}
         */
        this.blockSize = blockSize;
    }

    update() {
        let size = this.getRealSize(this.map.size);

        this.clear();

        this.$.width = size;
        this.$.height = size;

        this.map.blocks.forEach((block) => {
            this.ctx.fillStyle = block.color;

            this.ctx.fillRect(
                this.getRealSize(block.x),
                this.getRealSize(block.y),
                this.blockSize,
                this.blockSize
            );
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.$.width, this.$.height);
    }

    /**
     *
     * @param {number} n
     */
    getRealSize(n) {
        return n * this.blockSize;
    }
}