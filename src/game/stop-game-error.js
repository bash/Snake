/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class StopGameError {
    /**
     *
     * @param {Game} game
     */
    constructor(game) {
        /**
         *
         * @type {Game}
         */
        this.game = game;
    }

    toString() {
        return 'Game stopped after ' + this.game.ticks + ' ticks';
    }
}
