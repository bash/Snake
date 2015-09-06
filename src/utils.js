/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {Number} lowest
 * @param {Number} highest
 * @returns {Number}
 */
export function random(lowest, highest) {
    return Math.floor(Math.random() * highest) + lowest;
}

/**
 *
 * @param {Array} haystack
 * @param {Block} needle
 */
export function findBlockInArray(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i].equals(needle)) {
            return haystack[i];
        }
    }
}

export function findDuplicate(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i].equals(needle) && haystack[i] !== needle) {
            return haystack[i];
        }
    }
}