/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Direction {
    /**
     *
     * @param {number} direction
     * @returns {number}
     */
    static getOpposite(direction) {
        return -direction;
    }

    /**
     *
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    static areOpposites(a, b) {
        return a === -b && a !== 0 && b !== 0;
    }
}

/**
 *
 * @type {number}
 */
Direction.none = 0;

/**
 *
 * @type {number}
 */
Direction.up = 1;

/**
 *
 * @type {number}
 */
Direction.down = -1;

/**
 *
 * @type {number}
 */
Direction.left = 2;

/**
 *
 * @type {number}
 */
Direction.right = -2;