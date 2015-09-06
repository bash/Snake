/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Event {
    /**
     *
     * @param {{}} detail
     */
    constructor(detail = {}) {
        /**
         *
         * @type {{}}
         */
        this.detail = detail;
    }
}

export class EventTarget {
    constructor() {
        /**
         *
         * @type {Array}
         */
        this.listeners = [];
    }

    /**
     *
     * @param {{}} detail
     */
    dispatch(detail) {
        let event = new Event(detail);

        this.listeners.forEach(function (listener) {
            listener.call(null, event);
        });
    }

    /**
     *
     * @param {Function} callbackFn
     */
    addListener(callbackFn) {
        this.listeners.push(callbackFn);
    }

    /**
     *
     * @param {Function} callbackFn
     */
    removeListener(callbackFn) {
        let index = this.listeners.indexOf(callbackFn);

        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
}