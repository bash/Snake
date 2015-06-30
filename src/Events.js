(function(){

    'use strict';

    define(function(){
        /**
         *
         * @param {{}} details
         * @constructor
         */
        var Event = function Event(detail) {
            /**
             *
             * @type {{}}
             */
            this.detail = detail;
        };

        var EventTarget = function EventTarget(){
            this.listeners = [];
        };

        /**
         *
         * @param {{}} details
         */
        EventTarget.prototype.dispatch = function(details){
            var event = new Event(details);

            this.listeners.forEach(function(listener){
                listener.call(listener.__thisArg__, event);
            });
        };

        /**
         *
         * @param {Function} listener
         * @param {Object} thisArg
         */
        EventTarget.prototype.addListener = function(listener, thisArg) {
            if (this.listeners.indexOf(listener) === -1) {
                this.listeners.push(listener);
                listener.__thisArg__ = thisArg;
            }
        };

        /**
         *
         * @param {Function} listener
         */
        EventTarget.prototype.removeListener = function(listener) {
            var index = this.listeners.indexOf(listener);

            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };

        return EventTarget;
    });
})();