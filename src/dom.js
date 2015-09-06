/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

let globalDocument = typeof window === 'object' ? window.document : undefined;

/**
 *
 * A simple onReady function that fires even if the DOM is already loaded.
 *
 * @source https://github.com/bash/kite.js/blob/master/src/dom/on-ready.js
 * @param {Document} document
 * @returns {Promise}
 */
export function onReady(document = globalDocument) {
    if (typeof document !== 'object' || document === null) {
        throw new TypeError('document must be an object');
    }

    return new Promise(function (done) {
        if (document.readyState === 'complete') {
            done(document);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                done(document);
            });
        }
    });
}