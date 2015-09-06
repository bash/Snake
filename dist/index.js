(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
  /**
   *
   * @param {HTMLCanvasElement} $
   * @param {Map} map
   * @param {number} blockSize
   */

  function Canvas($) {
    var map = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var blockSize = arguments.length <= 2 || arguments[2] === undefined ? 30 : arguments[2];

    _classCallCheck(this, Canvas);

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

  _createClass(Canvas, [{
    key: 'update',
    value: function update() {
      var _this = this;

      var size = this.getRealSize(this.map.size);

      this.clear();

      this.$.width = size;
      this.$.height = size;

      this.map.blocks.forEach(function (block) {
        _this.ctx.fillStyle = block.color;

        _this.ctx.fillRect(_this.getRealSize(block.x), _this.getRealSize(block.y), _this.blockSize, _this.blockSize);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.$.width, this.$.height);
    }

    /**
     *
     * @param {number} n
     */
  }, {
    key: 'getRealSize',
    value: function getRealSize(n) {
      return n * this.blockSize;
    }
  }]);

  return Canvas;
})();

exports.Canvas = Canvas;

},{}],2:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Direction = (function () {
  function Direction() {
    _classCallCheck(this, Direction);
  }

  /**
   *
   * @type {number}
   */

  _createClass(Direction, null, [{
    key: "getOpposite",

    /**
     *
     * @param {number} direction
     * @returns {number}
     */
    value: function getOpposite(direction) {
      return -direction;
    }

    /**
     *
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
  }, {
    key: "areOpposites",
    value: function areOpposites(a, b) {
      return a === -b && a !== 0 && b !== 0;
    }
  }]);

  return Direction;
})();

exports.Direction = Direction;
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

},{}],3:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.onReady = onReady;
var globalDocument = typeof window === 'object' ? window.document : undefined;

/**
 *
 * A simple onReady function that fires even if the DOM is already loaded.
 *
 * @source https://github.com/bash/kite.js/blob/master/src/dom/on-ready.js
 * @param {Document} document
 * @returns {Promise}
 */

function onReady() {
    var document = arguments.length <= 0 || arguments[0] === undefined ? globalDocument : arguments[0];

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

},{}],4:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var _rainbowGenerator = require('../rainbow-generator');

var OverDrawing = (function () {
    function OverDrawing() {
        _classCallCheck(this, OverDrawing);
    }

    _createClass(OverDrawing, null, [{
        key: 'draw',

        /**
         *
         * @returns {Map}
         */
        value: function draw() {
            var map = new _entitiesMap.Map(20),
                generator = new _rainbowGenerator.RainbowGenerator();

            var x = 1,
                y = 7;

            // Draw the "O"
            map.obstacles.push(new _entitiesBlock.Block(x, y + 1, generator.get()), new _entitiesBlock.Block(x, y + 2, generator.get()), new _entitiesBlock.Block(x, y + 3, generator.get()), new _entitiesBlock.Block(x + 1, y + 4, generator.get()), new _entitiesBlock.Block(x + 2, y + 4, generator.get()), new _entitiesBlock.Block(x + 3, y + 3, generator.get()), new _entitiesBlock.Block(x + 3, y + 2, generator.get()), new _entitiesBlock.Block(x + 3, y + 1, generator.get()), new _entitiesBlock.Block(x + 2, y, generator.get()), new _entitiesBlock.Block(x + 1, y, generator.get()));

            x = x + 5;

            // Draw "V"
            map.obstacles.push(new _entitiesBlock.Block(x, y, generator.get()), new _entitiesBlock.Block(x, y + 1, generator.get()), new _entitiesBlock.Block(x, y + 2, generator.get()), new _entitiesBlock.Block(x, y + 3, generator.get()), new _entitiesBlock.Block(x + 1, y + 4, generator.get()), new _entitiesBlock.Block(x + 2, y + 4, generator.get()), new _entitiesBlock.Block(x + 3, y + 3, generator.get()), new _entitiesBlock.Block(x + 3, y + 2, generator.get()), new _entitiesBlock.Block(x + 3, y + 1, generator.get()), new _entitiesBlock.Block(x + 3, y, generator.get()));

            x = x + 5;

            // Draw "E"
            map.obstacles.push(new _entitiesBlock.Block(x, y, generator.get()), new _entitiesBlock.Block(x, y + 1, generator.get()), new _entitiesBlock.Block(x, y + 2, generator.get()), new _entitiesBlock.Block(x, y + 3, generator.get()), new _entitiesBlock.Block(x, y + 4, generator.get()), new _entitiesBlock.Block(x + 1, y + 4, generator.get()), new _entitiesBlock.Block(x + 2, y + 4, generator.get()), new _entitiesBlock.Block(x + 2, y, generator.get()), new _entitiesBlock.Block(x + 1, y, generator.get()),
            // Midle parts
            new _entitiesBlock.Block(x + 2, y + 2, generator.get()), new _entitiesBlock.Block(x + 1, y + 2, generator.get()));

            x = x + 4;

            // Draw the "R"
            map.obstacles.push(new _entitiesBlock.Block(x, y, generator.get()), new _entitiesBlock.Block(x, y + 1, generator.get()), new _entitiesBlock.Block(x, y + 2, generator.get()), new _entitiesBlock.Block(x, y + 3, generator.get()), new _entitiesBlock.Block(x, y + 4, generator.get()), new _entitiesBlock.Block(x + 3, y + 4, generator.get()), new _entitiesBlock.Block(x + 3, y + 3, generator.get()), new _entitiesBlock.Block(x + 3, y + 1, generator.get()), new _entitiesBlock.Block(x + 2, y, generator.get()), new _entitiesBlock.Block(x + 1, y, generator.get()),

            // Midle parts
            new _entitiesBlock.Block(x + 2, y + 2, generator.get()), new _entitiesBlock.Block(x + 1, y + 2, generator.get()));

            return map;
        }
    }]);

    return OverDrawing;
})();

exports.OverDrawing = OverDrawing;

},{"../entities/block":5,"../entities/map":6,"../rainbow-generator":18}],5:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _directionJs = require('./../direction.js');

var Block = (function () {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {string} color
     */

    function Block() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var color = arguments.length <= 2 || arguments[2] === undefined ? '#22FF22' : arguments[2];

        _classCallCheck(this, Block);

        /**
         *
         * @type {number}
         */
        this.x = x;

        /**
         *
         * @type {number}
         */
        this.y = y;

        /**
         *
         * @type {string}
         */
        this.color = color;
    }

    /**
     *
     * @returns {string}
     */

    _createClass(Block, [{
        key: 'toString',
        value: function toString() {
            return '(' + this.x + '/' + this.y + ')';
        }

        /**
         *
         * @param {{x: *, y: *}} other
         * @returns {boolean}
         */
    }, {
        key: 'equals',
        value: function equals(other) {
            return other.x === this.x && other.y === this.y;
        }

        /**
         *
         * @param {number} direction
         */
    }, {
        key: 'getNeighbour',
        value: function getNeighbour(direction) {
            return Block.getNeighbour(this, direction);
        }

        /**
         *
         * @param {Block} block
         * @param {number} direction
         */
    }], [{
        key: 'getNeighbour',
        value: function getNeighbour(block, direction) {
            switch (direction) {
                case 0:
                    return new Block(block.x, block.y, block.color);
                case _directionJs.Direction.left:
                    return new Block(block.x - 1, block.y, block.color);
                case _directionJs.Direction.right:
                    return new Block(block.x + 1, block.y, block.color);
                case _directionJs.Direction.down:
                    return new Block(block.x, block.y + 1, block.color);
                case _directionJs.Direction.up:
                    return new Block(block.x, block.y - 1, block.color);
            }

            throw new Error('Invalid direction ' + direction);
        }
    }]);

    return Block;
})();

exports.Block = Block;

},{"./../direction.js":2}],6:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsJs = require('../utils.js');

var _blockJs = require('./block.js');

var _snakeJs = require('./snake.js');

var Map = (function () {
  /**
   *
   * @param {number} size
   */

  function Map(size) {
    _classCallCheck(this, Map);

    /**
     *
     * @type {number}
     */
    this.size = size;

    /**
     *
     * @type {Array}
     */
    this.snake = [];

    /**
     *
     * @type {Array}
     */
    this.obstacles = [];

    /**
     *
     * @type {Array}
     */
    this.food = [];
  }

  /**
   *
   * @param {Block} block
   * @returns {boolean}
   */

  _createClass(Map, [{
    key: 'contains',
    value: function contains(block) {
      return block.x < this.size && block.y < this.size && block.x > -1 && block.y > -1;
    }

    /**
     *
     * @param {Snake|Array} snake
     */
  }, {
    key: 'isVacant',

    /**
     *
     * @param {Block} block
     * @returns {boolean}
     */
    value: function isVacant(block) {
      return !(0, _utilsJs.findBlockInArray)(this.blocks, block);
    }

    /**
     *
     * @param {Block} block
     * @returns {boolean}
     */
  }, {
    key: 'isVacantFromSnake',
    value: function isVacantFromSnake(block) {
      return !(0, _utilsJs.findBlockInArray)(this.snake, block);
    }

    /**
     *
     * @returns {Block}
     */
  }, {
    key: 'getRandomBlock',
    value: function getRandomBlock(color) {
      var x = (0, _utilsJs.random)(0, this.size),
          y = (0, _utilsJs.random)(0, this.size);

      return new _blockJs.Block(x, y, color);
    }

    /**
     *
     * @returns {Block}
     */
  }, {
    key: 'getRandomVacantBlock',
    value: function getRandomVacantBlock(color) {
      var block = this.getRandomBlock(color);

      while (!this.isVacant(block)) {
        block = this.getRandomBlock(color);
      }

      return block;
    }

    /**
     *
     * @returns {number}
     */
  }, {
    key: 'getCenter',
    value: function getCenter() {
      return Math.floor(this.size / 2);
    }
  }, {
    key: 'snake',
    set: function set(snake) {
      if (snake instanceof _snakeJs.Snake) {
        snake = snake.toArray();
      }

      this._snake = snake;
    },

    /**
     *
     * @returns {Snake|Array}
     */
    get: function get() {
      return this._snake;
    }

    /**
     *
     * @returns {Block[]}
     */
  }, {
    key: 'blocks',
    get: function get() {
      return this.snake.concat(this.food).concat(this.obstacles);
    }
  }]);

  return Map;
})();

exports.Map = Map;

},{"../utils.js":19,"./block.js":5,"./snake.js":7}],7:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _direction = require('../direction');

var _block = require('./block');

var Snake = (function () {
    /**
     *
     * @param {Block} firstBlock
     */

    function Snake(firstBlock) {
        _classCallCheck(this, Snake);

        /**
         *
         * @type {Block[]}
         */
        this.parts = [firstBlock];

        /**
         *
         * @type {Array}
         */
        this.stash = [this.parts];

        this.stop();
    }

    _createClass(Snake, [{
        key: 'stop',
        value: function stop() {
            this.direction = _direction.Direction.none;
        }
    }, {
        key: 'move',
        value: function move() {
            var _this = this;

            var partsBefore = [].concat(this.parts);

            this.parts.unshift(this.parts[0].getNeighbour(this.direction));

            partsBefore.forEach(function (part, i) {
                _this.parts[i].color = part.color;
            });

            this.stash.push(partsBefore);
            this.parts.pop();
        }
    }, {
        key: 'back',
        value: function back() {
            this.parts = this.stash.pop();
        }

        /**
         *
         * @param {Block} block
         */
    }, {
        key: 'grow',
        value: function grow(block) {
            if (block !== undefined) {
                var head = this.stash[this.stash.length - 1][0];

                this.parts.push(new _block.Block(head.x, head.y, block.color));
            } else {
                this.parts.push(this.head.getNeighbour(_direction.Direction.getOpposite(this.direction)));
            }
        }

        /**
         *
         * @returns {Block[]}
         */
    }, {
        key: 'toArray',
        value: function toArray() {
            return this.parts;
        }

        /**
         *
         * @returns {Block}
         */
    }, {
        key: 'head',
        get: function get() {
            return this.parts[0];
        }

        /**
         *
         * @param {number} value
         */
    }, {
        key: 'direction',
        set: function set(value) {
            this._direction = value;
        },

        /**
         *
         * @returns {number}
         */
        get: function get() {
            return this._direction;
        }
    }]);

    return Snake;
})();

exports.Snake = Snake;

},{"../direction":2,"./block":5}],8:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event =
/**
 *
 * @param {{}} detail
 */
function Event() {
    var detail = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Event);

    /**
     *
     * @type {{}}
     */
    this.detail = detail;
};

exports.Event = Event;

var EventTarget = (function () {
    function EventTarget() {
        _classCallCheck(this, EventTarget);

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

    _createClass(EventTarget, [{
        key: "dispatch",
        value: function dispatch(detail) {
            var event = new Event(detail);

            this.listeners.forEach(function (listener) {
                listener.call(null, event);
            });
        }

        /**
         *
         * @param {Function} callbackFn
         */
    }, {
        key: "addListener",
        value: function addListener(callbackFn) {
            this.listeners.push(callbackFn);
        }

        /**
         *
         * @param {Function} callbackFn
         */
    }, {
        key: "removeListener",
        value: function removeListener(callbackFn) {
            var index = this.listeners.indexOf(callbackFn);

            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }
    }]);

    return EventTarget;
})();

exports.EventTarget = EventTarget;

},{}],9:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

var _dom = require('./dom');

var _direction = require('./direction');

var _canvas = require('./canvas');

var _gameGame = require('./game/game');

(0, _dom.onReady)().then(function () {
    var $canvas = document.querySelector('.snake-canvas'),
        game = new _gameGame.Game(new _canvas.Canvas($canvas));

    var $level = document.querySelector('.snake-level'),
        $score = document.querySelector('.snake-score'),
        $keyboard = document.querySelector('[data-pick-control="keyboard"]'),
        $mouse = document.querySelector('[data-pick-control="mouse"]');

    //
    // Pick Controls
    //
    var controlType = 'keyboard';

    $keyboard.addEventListener('click', function () {
        controlType = 'keyboard';

        $keyboard.classList.add('-active');
        $mouse.classList.remove('-active');
    });

    $mouse.addEventListener('click', function () {
        controlType = 'mouse';

        $mouse.classList.add('-active');
        $keyboard.classList.remove('-active');
    });

    //
    // Event Listeners
    //
    game.onScoreUpdate.addListener(function (e) {
        $score.innerText = e.detail.score;
    });

    game.onLevelUpdate.addListener(function (e) {
        $level.innerText = e.detail.level;
    });

    //
    // Keyboard Listener
    //
    window.addEventListener('keydown', function (e) {
        if (controlType === 'keyboard') {
            switch (e.keyCode) {
                case 38:
                    e.preventDefault();
                    game.setDirection(_direction.Direction.up);
                    break;
                case 40:
                    e.preventDefault();
                    game.setDirection(_direction.Direction.down);
                    break;
                case 37:
                    game.setDirection(_direction.Direction.left);
                    break;
                case 39:
                    game.setDirection(_direction.Direction.right);
                    break;
            }
        }

        if (e.keyCode == 32) {
            e.preventDefault();
            game.over ? game.start() : game.pause();
        }
    });

    //
    // Mouse Listener
    //
    $canvas.addEventListener('mousemove', function (e) {
        if (controlType === 'mouse') {
            var pos = $canvas.getBoundingClientRect();

            var head = game.snake.head,
                headX = pos.left + pos.width / game.map.size * head.x,
                headY = pos.top + pos.height / game.map.size * head.y;

            var diffX = e.pageX - headX,
                diffY = e.pageY - headY;

            var dirX = diffX > 0 ? _direction.Direction.right : _direction.Direction.left,
                dirY = diffY > 0 ? _direction.Direction.down : _direction.Direction.up;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                game.setDirection(dirX);
            } else {
                game.setDirection(dirY);
            }
        }
    });

    $canvas.addEventListener('click', function () {
        if (controlType == 'mouse' && game.over) {
            game.start();
        }
    });

    game.start();
});

},{"./canvas":1,"./direction":2,"./dom":3,"./game/game":11}],10:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('../utils');

var _rainbowGenerator = require('../rainbow-generator');

var _levelsLevelStack = require('../levels/level-stack');

var _stopGameError = require('./stop-game-error');

var GamePlay = (function () {
    /**
     *
     * @param {Game} game
     */

    function GamePlay(game) {
        _classCallCheck(this, GamePlay);

        /**
         *
         * @type {Game}
         */
        this.game = game;

        /**
         *
         * @type {RainbowGenerator}
         */
        this.generator = new _rainbowGenerator.RainbowGenerator();

        /**
         *
         * @type {{}}
         */
        this.level = null;

        /**
         *
         * @type {LevelStack}
         */
        this.levelStack = new _levelsLevelStack.LevelStack();
    }

    /**
     *
     * @returns {Map}
     */

    _createClass(GamePlay, [{
        key: 'start',
        value: function start() {
            this.levelStack.current = 0;
            this.startLevel();
        }
    }, {
        key: 'startLevel',
        value: function startLevel() {
            var game = this.game;

            this.level = this.levelStack.get();
            this.game.updateLevel(this.levelStack.current + 1);

            // Set game presets from the level.
            game.snake.parts = [this.level.initialBlock];
            game.snake.stop();

            game.speed = this.level.tickSpeed;
            game.setMap(this.level.map);
            game.updateScore(game.score);

            // Get snake color from generator
            this.generator.rewind();
            this.game.snake.head.color = this.generator.get();
        }

        /**
         *
         * @param {number} tick
         */
    }, {
        key: 'doTick',
        value: function doTick(tick) {
            var game = this.game,
                snake = game.snake,
                map = this.map;

            if (this.levelStack.peek() && game.score >= this.levelStack.peek().entryScore) {
                this.levelStack.next();
                this.startLevel();
            }

            snake.move();

            this.spawnFood(tick);

            // Todo: create function for these lovely ifs

            // Test if the snake hit the border
            if (!map.contains(snake.head)) {
                snake.back();

                throw new _stopGameError.StopGameError(game);
            }

            // Test if snake hit an obstacle
            if ((0, _utils.findBlockInArray)(map.obstacles, snake.head)) {
                snake.back();

                throw new _stopGameError.StopGameError(game);
            }

            // Prevent the snake from biting itself
            if ((0, _utils.findDuplicate)(snake.parts, snake.parts[0])) {
                snake.back();
                map.snake = snake;

                throw new _stopGameError.StopGameError(game);
            }

            this.consumeFood();
        }

        /**
         *
         * @param {number} tick
         */
    }, {
        key: 'spawnFood',
        value: function spawnFood(tick) {
            var map = this.map;

            // Spawn food every 20 ticks
            if (tick % 20 === 0 && map.food.length === 0) {
                var block = map.getRandomVacantBlock(this.generator.get());

                map.food = [block];
            }
        }
    }, {
        key: 'consumeFood',
        value: function consumeFood() {
            if ((0, _utils.findBlockInArray)(this.map.food, this.snake.head)) {
                var game = this.game;

                game.snake.grow(game.map.food.pop());
                game.updateScore(game.score + this.level.multiplier);
            }
        }
    }, {
        key: 'map',
        get: function get() {
            return this.game.map;
        }

        /**
         *
         * @returns {Snake}
         */
    }, {
        key: 'snake',
        get: function get() {
            return this.game.snake;
        }
    }]);

    return GamePlay;
})();

exports.GamePlay = GamePlay;

},{"../levels/level-stack":15,"../rainbow-generator":18,"../utils":19,"./stop-game-error":12}],11:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesSnake = require('../entities/snake');

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var _rainbowGenerator = require('../rainbow-generator');

var _gamePlay = require('./game-play');

var _stopGameError = require('./stop-game-error');

var _drawingsOverDrawing = require('../drawings/over-drawing');

var _events = require('../events');

var _direction = require('../direction');

var Game = (function () {
  /**
   *
   * @param {Canvas} canvas
   */

  function Game(canvas) {
    _classCallCheck(this, Game);

    /**
     *
     * @type {Map}
     */
    this.map = new _entitiesMap.Map();

    /**
     *
     * @type {Canvas}
     */
    this.canvas = canvas;
    this.canvas.map = this.map;

    /**
     *
     * @type {Snake}
     */
    this.snake = new _entitiesSnake.Snake(new _entitiesBlock.Block(0, 0));

    /**
     *
     * @type {number}
     */
    this.speed = 100;

    /**
     *
     * @type {number}
     */
    this.score = 0;

    /**
     *
     * @type {GamePlay}
     */
    this.gamePlay = new _gamePlay.GamePlay(this);

    /**
     *
     * @type {number}
     */
    this.ticks = 0;

    /**
     *
     * @type {number}
     */
    this.level = 1;

    /**
     *
     * @type {boolean}
     */
    this.over = false;

    /**
     *
     * @type {EventTarget}
     */
    this.onScoreUpdate = new _events.EventTarget();

    /**
     *
     * @type {EventTarget}
     */
    this.onGameOver = new _events.EventTarget();

    /**
     *
     * @type {EventTarget}
     */
    this.onLevelUpdate = new _events.EventTarget();

    /**
     *
     * @type {EventTarget}
     */
    this.onStart = new _events.EventTarget();
  }

  /**
   *
   * @param {number} direction
   */

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      var direction = arguments.length <= 0 || arguments[0] === undefined ? _direction.Direction.none : arguments[0];

      this.over = false;
      this.score = 0;
      this.level = 1;
      this.ticks = 0;

      this.snake.direction = direction;
      this.gamePlay.start();
      this.onStart.dispatch();

      this.doTick();
    }

    /**
     *
     * @returns {boolean}
     */
  }, {
    key: 'hasStarted',
    value: function hasStarted() {
      return this.ticks > 0;
    }
  }, {
    key: 'doTick',
    value: function doTick() {
      var _this = this;

      if (!this.isPaused()) {
        this.ticks++;

        try {
          this.gamePlay.doTick(this.ticks);
        } catch (e) {
          if (e instanceof _stopGameError.StopGameError) {
            this.gameOver();
            return;
          }

          throw e;
        }
      }

      this.map.snake = this.snake;
      this.canvas.update();

      setTimeout(function () {
        _this.doTick();
      }, this.speed);
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.setMap(_drawingsOverDrawing.OverDrawing.draw());
      this.setDirection(_direction.Direction.none);

      this.over = true;

      this.onGameOver.dispatch({ score: this.score, level: this.level, ticks: this.ticks });
    }

    /**
     *
     * @returns {boolean}
     */
  }, {
    key: 'isPaused',
    value: function isPaused() {
      return this.snake.direction === 0;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.setDirection(_direction.Direction.none);
    }

    /**
     *
     * @param {number} score
     */
  }, {
    key: 'updateScore',
    value: function updateScore(score) {
      this.score = score;
      this.onScoreUpdate.dispatch({ score: score });
    }

    /**
     *
     * @param {number} level
     */
  }, {
    key: 'updateLevel',
    value: function updateLevel(level) {
      this.level = level;
      this.onLevelUpdate.dispatch({ level: level });
    }

    /**
     *
     * @param {Map} map
     */
  }, {
    key: 'setMap',
    value: function setMap(map) {
      this.map = map;
      this.canvas.map = map;
      this.canvas.update();
    }

    /**
     *
     * @param {number} direction
     * @returns {*}
     */
  }, {
    key: 'setDirection',
    value: function setDirection(direction) {
      var snake = this.snake;

      if (!this.map.isVacantFromSnake(snake.head.getNeighbour(direction)) && direction !== _direction.Direction.none) {
        return false;
      }

      return snake.direction = direction;
    }
  }]);

  return Game;
})();

exports.Game = Game;

},{"../direction":2,"../drawings/over-drawing":4,"../entities/block":5,"../entities/map":6,"../entities/snake":7,"../events":8,"../rainbow-generator":18,"./game-play":10,"./stop-game-error":12}],12:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var StopGameError = (function () {
  /**
   *
   * @param {Game} game
   */

  function StopGameError(game) {
    _classCallCheck(this, StopGameError);

    /**
     *
     * @type {Game}
     */
    this.game = game;
  }

  _createClass(StopGameError, [{
    key: 'toString',
    value: function toString() {
      return 'Game stopped after ' + this.game.ticks + ' ticks';
    }
  }]);

  return StopGameError;
})();

exports.StopGameError = StopGameError;

},{}],13:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var FirstLevel = function FirstLevel() {
  _classCallCheck(this, FirstLevel);

  /**
   *
   * @type {Map}
   */
  this.map = new _entitiesMap.Map(20);

  var center = Math.floor(this.map.size / 2);

  /**
   *
   * @type {Block}
   */
  this.initialBlock = new _entitiesBlock.Block(center, center);

  /**
   *
   * @type {number}
   */
  this.tickSpeed = 150;

  /**
   *
   * @type {number}
   */
  this.entryScore = 0;

  /**
   *
   * @type {number}
   */
  this.multiplier = 1;
};

exports.FirstLevel = FirstLevel;

},{"../entities/block":5,"../entities/map":6}],14:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var FourthLevel = function FourthLevel() {
  _classCallCheck(this, FourthLevel);

  /**
   *
   * @type {Map}
   */
  this.map = new _entitiesMap.Map(21);

  var center = this.map.getCenter();

  /**
   *
   * @type {Block}
   */
  this.initialBlock = new _entitiesBlock.Block(center - 4, center);

  /**
   *
   * @type {number}
   */
  this.tickSpeed = 125;

  /**
   *
   * @type {number}
   */
  this.entryScore = 50;

  /**
   *
   * @type {number}
   */
  this.multiplier = 2;

  var obstacles = this.map.obstacles,
      size = this.map.size;

  // Add some obstacles
  for (var i = 4; i < size - 3; i++) {
    obstacles.push(new _entitiesBlock.Block(center, i, '#ccc'));
  }

  for (var i = 4; i < size - 4; i++) {
    obstacles.push(new _entitiesBlock.Block(i, 4, '#ccc'));
  }

  for (var i = 4; i < size - 4; i++) {
    obstacles.push(new _entitiesBlock.Block(i, size - 4, '#ccc'));
  }
};

exports.FourthLevel = FourthLevel;

},{"../entities/block":5,"../entities/map":6}],15:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _firstLevel = require('./first-level');

var _secondLevel = require('./second-level');

var _thirdLevel = require('./third-level');

var _fourthLevel = require('./fourth-level');

var LevelStack = (function () {
    function LevelStack() {
        _classCallCheck(this, LevelStack);

        /**
         *
         * @type {*[]}
         */
        this.levels = [new _firstLevel.FirstLevel(), new _secondLevel.SecondLevel(), new _thirdLevel.ThirdLevel(), new _fourthLevel.FourthLevel()];

        this.current = 0;
    }

    _createClass(LevelStack, [{
        key: 'next',
        value: function next() {
            if (this.current < this.levels.length - 1) {
                this.current++;
            }
        }

        /**
         *
         * @returns {*}
         */
    }, {
        key: 'get',
        value: function get() {
            return this.levels[this.current];
        }

        /**
         *
         * @returns {*}
         */
    }, {
        key: 'peek',
        value: function peek() {
            if (this.levels[this.current + 1]) {
                return this.levels[this.current + 1];
            }
        }
    }]);

    return LevelStack;
})();

exports.LevelStack = LevelStack;

},{"./first-level":13,"./fourth-level":14,"./second-level":16,"./third-level":17}],16:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var SecondLevel = function SecondLevel() {
  _classCallCheck(this, SecondLevel);

  /**
   *
   * @type {Map}
   */
  this.map = new _entitiesMap.Map(20);

  var center = Math.floor(this.map.size / 2);

  /**
   *
   * @type {Block}
   */
  this.initialBlock = new _entitiesBlock.Block(center, center);

  /**
   *
   * @type {number}
   */
  this.tickSpeed = 110;

  /**
   *
   * @type {number}
   */
  this.entryScore = 20;

  /**
   *
   * @type {number}
   */
  this.multiplier = 2;
};

exports.SecondLevel = SecondLevel;

},{"../entities/block":5,"../entities/map":6}],17:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesMap = require('../entities/map');

var _entitiesBlock = require('../entities/block');

var ThirdLevel = function ThirdLevel() {
  _classCallCheck(this, ThirdLevel);

  /**
   *
   * @type {Map}
   */
  this.map = new _entitiesMap.Map(20);

  var center = Math.floor(this.map.size / 2);

  /**
   *
   * @type {Block}
   */
  this.initialBlock = new _entitiesBlock.Block(center, center);

  /**
   *
   * @type {number}
   */
  this.tickSpeed = 125;

  /**
   *
   * @type {number}
   */
  this.entryScore = 30;

  /**
   *
   * @type {number}
   */
  this.multiplier = 2;

  var obstacles = this.map.obstacles;

  // Add some obstacles
  for (var i = 4; i < 16; i++) {
    obstacles.push(new _entitiesBlock.Block(i, 5, '#ccc'));
  }

  obstacles.push(new _entitiesBlock.Block(4, 6, '#ccc'));
  obstacles.push(new _entitiesBlock.Block(15, 6, '#ccc'));

  for (var j = 4; j < 16; j++) {
    obstacles.push(new _entitiesBlock.Block(j, 15, '#ccc'));
  }

  obstacles.push(new _entitiesBlock.Block(4, 14, '#ccc'));
  obstacles.push(new _entitiesBlock.Block(15, 14, '#ccc'));
};

exports.ThirdLevel = ThirdLevel;

},{"../entities/block":5,"../entities/map":6}],18:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RainbowGenerator = (function () {
    _createClass(RainbowGenerator, null, [{
        key: 'colors',

        /**
         *
         * @returns {string[]}
         */
        get: function get() {
            return ['#F03B23', // Red
            '#FE8B14', // Orange
            '#F7D612', // Yellow
            '#009444', // Green
            '#219EA9', // Bluegreen
            '#214099', // Blue
            '#7D3D95' // Violet
            ];
        }
    }]);

    function RainbowGenerator() {
        _classCallCheck(this, RainbowGenerator);

        this.rewind();
    }

    _createClass(RainbowGenerator, [{
        key: 'rewind',
        value: function rewind() {
            this.next = 0;
        }

        /**
         *
         * @returns {string}
         */
    }, {
        key: 'get',
        value: function get() {
            var color = RainbowGenerator.colors[this.next];

            this.next++;

            if (this.next === RainbowGenerator.colors.length) {
                this.rewind();
            }

            return color;
        }
    }]);

    return RainbowGenerator;
})();

exports.RainbowGenerator = RainbowGenerator;

},{}],19:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {Number} lowest
 * @param {Number} highest
 * @returns {Number}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.random = random;
exports.findBlockInArray = findBlockInArray;
exports.findDuplicate = findDuplicate;

function random(lowest, highest) {
    return Math.floor(Math.random() * highest) + lowest;
}

/**
 *
 * @param {Array} haystack
 * @param {Block} needle
 */

function findBlockInArray(haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].equals(needle)) {
            return haystack[i];
        }
    }
}

function findDuplicate(haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].equals(needle) && haystack[i] !== needle) {
            return haystack[i];
        }
    }
}

},{}]},{},[9])