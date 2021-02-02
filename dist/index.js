(function () {
    'use strict';

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
    function onReady(document = globalDocument) {
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

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Direction {
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

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Canvas {
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
                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const effectiveColor = typeof block.color === 'string'
                    ? block.color
                    : (isDarkMode
                        ? block.color.darkMode
                        : block.color.lightMode);
                this.ctx.fillStyle = effectiveColor;

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

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Block {
        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {string} color
         */
        constructor(x = 0, y = 0, color = '#22FF22') {
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
        toString() {
            return '(' + this.x + '/' + this.y + ')';
        }

        /**
         *
         * @param {{x: *, y: *}} other
         * @returns {boolean}
         */
        equals(other) {
            return other.x === this.x && other.y === this.y;
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Snake {
        /**
         *
         * @param {Block} firstBlock
         */
        constructor(firstBlock) {
            /**
             *
             * @type {Block[]}
             */
            this.parts = [ firstBlock ];

            /**
             *
             * @type {Array}
             */
            this.stash = [ this.parts ];

            this.stop();
        }

        stop() {
            this.direction = Direction.none;
        }

        move(map) {
            let partsBefore = [].concat(this.parts);

            this.parts.unshift(
                map.getNeighbour(this.parts[0], this.direction)
            );

            partsBefore.forEach((part, i) => {
                this.parts[i].color = part.color;
            });

            this.stash.push(partsBefore);
            this.parts.pop();
        }

        back() {
            this.parts = this.stash.pop();
        }

        /**
         *
         * @param {Block} block
         */
        grow(map, block) {
            if (block !== undefined) {
                let head = this.stash[this.stash.length - 1][0];

                this.parts.push(new Block(head.x, head.y, block.color));
            } else {
                this.parts.push(map.getNeighbour(this.head, Direction.getOpposite(this.direction)));
            }
        }

        /**
         *
         * @returns {Block[]}
         */
        toArray() {
            return this.parts;
        }

        /**
         *
         * @returns {Block}
         */
        get head() {
            return this.parts[0];
        }

        /**
         *
         * @param {number} value
         */
        set direction(value) {
            this._direction = value;
        }

        /**
         *
         * @returns {number}
         */
        get direction() {
            return this._direction;
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    /**
     *
     * @param {Number} lowest
     * @param {Number} highest
     * @returns {Number}
     */
    function random(lowest, highest) {
        return Math.floor(Math.random() * highest) + lowest;
    }

    /**
     *
     * @param {Array} haystack
     * @param {Block} needle
     */
    function findBlockInArray(haystack, needle) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i].equals(needle)) {
                return haystack[i];
            }
        }
    }

    function findDuplicate(haystack, needle) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i].equals(needle) && haystack[i] !== needle) {
                return haystack[i];
            }
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Map {
        /**
         *
         * @param {number} size
         */
        constructor(size) {
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
        contains(block) {
            return block.x < this.size && block.y < this.size && block.x > -1 && block.y > -1;
        }

        /**
         *
         * @param {Snake|Array} snake
         */
        set snake(snake) {
            if (snake instanceof Snake) {
                snake = snake.toArray();
            }

            this._snake = snake;
        }

        /**
         *
         * @returns {Snake|Array}
         */
        get snake() {
            return this._snake;
        }

        /**
         *
         * @returns {Block[]}
         */
        get blocks() {
            return this.snake.concat(this.food).concat(this.obstacles);
        }

        /**
         *
         * @param {Block} block
         * @returns {boolean}
         */
        isVacant(block) {
            return !findBlockInArray(this.blocks, block);
        }

        /**
         *
         * @param {Block} block
         * @returns {boolean}
         */
        isVacantFromSnake(block) {
            return !findBlockInArray(this.snake, block);
        }

        /**
         *
         * @returns {Block}
         */
        getRandomBlock(color) {
            let x = random(0, this.size),
                y = random(0, this.size);

            return new Block(x, y, color);
        }

        /**
         *
         * @returns {Block}
         */
        getRandomVacantBlock(color) {
            let block = this.getRandomBlock(color);

            while (!this.isVacant(block)) {
                block = this.getRandomBlock(color);
            }

            return block;
        }

        /**
         *
         * @returns {number}
         */
        getCenter() {
            return Math.floor(this.size / 2);
        }

        /**
         * @param {Block} block
         * @param {number} direction
         */
        getNeighbour(block, direction) {
            switch (direction) {
                case 0:
                    return new Block(block.x, block.y, block.color);
                case Direction.left:
                    return new Block(this._wrappingDecrement(block.x), block.y, block.color);
                case Direction.right:
                    return new Block(this._wrappingIncrement(block.x), block.y, block.color);
                case Direction.down:
                    return new Block(block.x, this._wrappingIncrement(block.y), block.color);
                case Direction.up:
                    return new Block(block.x, this._wrappingDecrement(block.y), block.color);
            }

            throw new Error(`Invalid direction ${direction}`);
        }

        _wrappingIncrement(value) {
            return (value + 1) % this.size;
        }

        _wrappingDecrement(value) {
            return value == 0
                ? this.size - 1
                : value - 1;
        }
    }

    class Color {
        constructor(lightMode, darkMode) {
            this.lightMode = lightMode;
            this.darkMode = darkMode;
        }
    }

    const WALL_COLOR = new Color('#ccc', '#333333');

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class RainbowGenerator {
        /**
         *
         * @returns {string[]}
         */
        static get colors() {
            return [
                new Color('#D9361F', '#8C2214'), // Red
                new Color('#FE8B14', '#CC7010'), // Orange
                new Color('#F7D612', '#C4AA0E'), // Yellow
                new Color('#009444', '#007A38'), // Green
                new Color('#219EA9', '#1C868F'), // Bluegreen
                new Color('#214099', '#214099'), // Blue
                new Color('#7D3D95', '#7D3D95')  // Violet
            ];
        }

        constructor() {
            this.rewind();
        }

        rewind() {
            this.next = 0;
        }

        /**
         *
         * @returns {string}
         */
        get() {
            let color = RainbowGenerator.colors[this.next];

            this.next++;

            if (this.next === RainbowGenerator.colors.length) {
                this.rewind();
            }

            return color;
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class FirstLevel {
        constructor() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(20);

            let center = Math.floor(this.map.size / 2);

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center, center);

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
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class SecondLevel {
        constructor() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(20);

            let center = Math.floor(this.map.size / 2);

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center, center);

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
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class ThirdLevel {
        constructor() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(20);

            let center = Math.floor(this.map.size / 2);

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center, center);

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

            let obstacles = this.map.obstacles;

            // Add some obstacles
            for (var i = 4; i < 16; i++) {
                obstacles.push( new Block(i, 5, WALL_COLOR) );
            }

            obstacles.push( new Block(4, 6, WALL_COLOR) );
            obstacles.push( new Block(15, 6, WALL_COLOR) );

            for (var j = 4; j < 16; j++) {
                obstacles.push( new Block(j, 15, WALL_COLOR) );
            }

            obstacles.push( new Block(4, 14, WALL_COLOR) );
            obstacles.push( new Block(15, 14, WALL_COLOR) );
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class FourthLevel {
        constructor() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(21);

            let center = this.map.getCenter();

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center - 4, center);

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

            let obstacles = this.map.obstacles,
                size = this.map.size;

            // Add some obstacles
            for (let i = 4; i < size - 3; i++) {
                obstacles.push( new Block(center, i, WALL_COLOR) );
            }

            for (let i = 4; i < size - 4; i++) {
                obstacles.push( new Block(i, 4, WALL_COLOR) );
            }

            for (let i = 4; i < size - 4; i++) {
                obstacles.push( new Block(i, size - 4, WALL_COLOR) );
            }
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class FifthLevel {
        constructor() {
            /**
             *
             * @type {Map}
             */
            this.map = new Map(21);

            let center = this.map.getCenter();

            /**
             *
             * @type {Block}
             */
            this.initialBlock = new Block(center - 4, center);

            /**
             *
             * @type {number}
             */
            this.tickSpeed = 110;

            /**
             *
             * @type {number}
             */
            this.entryScore = 70;

            /**
             *
             * @type {number}
             */
            this.multiplier = 2;

            let obstacles = this.map.obstacles,
                size = this.map.size;

            for (let i = 0; i < size - 4; i++) {
                obstacles.push( new Block(i + 4, 9, WALL_COLOR) );
                obstacles.push( new Block(i, 3, WALL_COLOR) );
                obstacles.push( new Block(i, 16, WALL_COLOR) );
            }
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class LevelStack {
        constructor() {
            /**
             *
             * @type {*[]}
             */
            this.levels = [
                new FirstLevel(),
                new SecondLevel(),
                new ThirdLevel(),
                new FourthLevel(),
                new FifthLevel()
            ];

            this.current = 0;
        }

        next() {
            if (this.current < this.levels.length - 1) {
                this.current++;
            }
        }

        /**
         *
         * @returns {*}
         */
        get() {
            return this.levels[this.current];
        }

        /**
         *
         * @returns {*}
         */
        peek() {
            if (this.levels[this.current + 1]) {
                return this.levels[this.current + 1];
            }
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class StopGameError {
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

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class GamePlay {
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

            /**
             *
             * @type {RainbowGenerator}
             */
            this.generator = new RainbowGenerator();

            /**
             *
             * @type {{}}
             */
            this.level = null;

            /**
             *
             * @type {LevelStack}
             */
            this.levelStack = new LevelStack();
        }

        /**
         *
         * @returns {Map}
         */
        get map() {
            return this.game.map;
        }

        /**
         *
         * @returns {Snake}
         */
        get snake() {
            return this.game.snake;
        }

        start() {
            this.levelStack.current = 0;
            this.startLevel();
        }

        startLevel() {
            var game = this.game;

            this.level = this.levelStack.get();
            this.game.updateLevel(this.levelStack.current + 1);

            // Set game presets from the level.
            game.snake.parts = [ this.level.initialBlock ];
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
        doTick(tick) {
            var game = this.game,
                snake = game.snake,
                map = this.map;

            if (this.levelStack.peek() && game.score >= this.levelStack.peek().entryScore) {
                this.levelStack.next();
                this.startLevel();
            }

            snake.move(map);

            this.spawnFood(tick);

            // Todo: create function for these lovely ifs

            // Test if the snake hit the border
            if (!map.contains(snake.head)) {
                snake.back();

                throw new StopGameError(game);
            }

            // Test if snake hit an obstacle
            if (findBlockInArray(map.obstacles, snake.head)) {
                snake.back();

                throw new StopGameError(game);
            }

            // Prevent the snake from biting itself
            if (findDuplicate(snake.parts, snake.parts[0])) {
                snake.back();
                map.snake = snake;

                throw new StopGameError(game);
            }

            this.consumeFood();
        }

        /**
         *
         * @param {number} tick
         */
        spawnFood(tick) {
            let map = this.map;

            // Spawn food every 20 ticks
            if (tick % 20 === 0 && map.food.length === 0) {
                let block = map.getRandomVacantBlock(this.generator.get());

                map.food = [ block ];
            }
        }

        consumeFood() {
            if (findBlockInArray(this.map.food, this.snake.head)) {
                let game = this.game;

                game.snake.grow(game.map, game.map.food.pop());
                game.updateScore(game.score + this.level.multiplier);
            }
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class OverDrawing {
        /**
         *
         * @returns {Map}
         */
        static draw() {
            var map = new Map(20),
                generator = new RainbowGenerator();

            var x = 1,
                y = 7;

            // Draw the "O"
            map.obstacles.push(
                new Block(x, y + 1, generator.get()),
                new Block(x, y + 2, generator.get()),
                new Block(x, y + 3, generator.get()),
                new Block(x + 1, y + 4, generator.get()),
                new Block(x + 2, y + 4, generator.get()),
                new Block(x + 3, y + 3, generator.get()),
                new Block(x + 3, y + 2, generator.get()),
                new Block(x + 3, y + 1, generator.get()),
                new Block(x + 2, y, generator.get()),
                new Block(x + 1, y, generator.get())
            );

            x = x + 5;

            // Draw "V"
            map.obstacles.push(
                new Block(x, y, generator.get()),
                new Block(x, y + 1, generator.get()),
                new Block(x, y + 2, generator.get()),
                new Block(x, y + 3, generator.get()),
                new Block(x + 1, y + 4, generator.get()),
                new Block(x + 2, y + 4, generator.get()),
                new Block(x + 3, y + 3, generator.get()),
                new Block(x + 3, y + 2, generator.get()),
                new Block(x + 3, y + 1, generator.get()),
                new Block(x + 3, y, generator.get())
            );

            x = x + 5;

            // Draw "E"
            map.obstacles.push(
                new Block(x, y, generator.get()),
                new Block(x, y + 1, generator.get()),
                new Block(x, y + 2, generator.get()),
                new Block(x, y + 3, generator.get()),
                new Block(x, y + 4, generator.get()),
                new Block(x + 1, y + 4, generator.get()),
                new Block(x + 2, y + 4, generator.get()),
                new Block(x + 2, y, generator.get()),
                new Block(x + 1, y, generator.get()),
                // Midle parts
                new Block(x + 2, y + 2, generator.get()),
                new Block(x + 1, y + 2, generator.get())
            );

            x = x + 4;

            // Draw the "R"
            map.obstacles.push(
                new Block(x, y, generator.get()),
                new Block(x, y + 1, generator.get()),
                new Block(x, y + 2, generator.get()),
                new Block(x, y + 3, generator.get()),
                new Block(x, y + 4, generator.get()),
                new Block(x + 3, y + 4, generator.get()),
                new Block(x + 3, y + 3, generator.get()),
                new Block(x + 3, y + 1, generator.get()),
                new Block(x + 2, y, generator.get()),
                new Block(x + 1, y, generator.get()),

                // Midle parts
                new Block(x + 2, y + 2, generator.get()),
                new Block(x + 1, y + 2, generator.get())
            );

            return map;
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Event {
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

    class EventTarget {
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

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    class Game {
        /**
         *
         * @param {Canvas} canvas
         */
        constructor(canvas) {
            /**
             *
             * @type {Map}
             */
            this.map = new Map();

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
            this.snake = new Snake(new Block(0, 0));

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
            this.gamePlay = new GamePlay(this);

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
            this.onScoreUpdate = new EventTarget();

            /**
             *
             * @type {EventTarget}
             */
            this.onGameOver = new EventTarget();

            /**
             *
             * @type {EventTarget}
             */
            this.onLevelUpdate = new EventTarget();

            /**
             *
             * @type {EventTarget}
             */
            this.onStart = new EventTarget();

            /** @type {EventTarget} */
            this.onTick = new EventTarget();
        }

        /**
         *
         * @param {number} direction
         */
        start(direction = Direction.none) {
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
        hasStarted() {
            return this.ticks > 0;
        }

        doTick() {
            if (!this.isPaused()) {
                this.ticks++;

                try {
                    this.gamePlay.doTick(this.ticks);
                } catch (e) {
                    if (e instanceof StopGameError) {
                        this.gameOver();
                        return;
                    }

                    throw e;
                }

                this.onTick.dispatch();
            }

            this.map.snake = this.snake;
            this.canvas.update();

            setTimeout(() => {
                this.doTick();
            }, this.speed);
        }

        gameOver() {
            this.setMap(OverDrawing.draw());
            this.setDirection(Direction.none);

            this.over = true;

            this.onGameOver.dispatch({ score: this.score, level: this.level, ticks: this.ticks });
        }

        /**
         *
         * @returns {boolean}
         */
        isPaused() {
            return this.snake.direction === 0;
        }

        pause() {
            this.setDirection(Direction.none);
        }

        /**
         *
         * @param {number} score
         */
        updateScore(score) {
            this.score = score;
            this.onScoreUpdate.dispatch({ score: score });
        }

        /**
         *
         * @param {number} level
         */
        updateLevel(level) {
            this.level = level;
            this.onLevelUpdate.dispatch({ level: level });
        }

        /**
         *
         * @param {Map} map
         */
        setMap(map) {
            this.map = map;
            this.canvas.map = map;
            this.canvas.update();
        }

        /**
         *
         * @param {number} direction
         * @returns {*}
         */
        setDirection(direction) {
            let snake = this.snake;

            if (!this.map.isVacantFromSnake(this.map.getNeighbour(snake.head, direction)) && direction !== Direction.none) {
                return false;
            }

            return snake.direction = direction;
        }
    }

    /**
     * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
     */

    onReady().then(function(){
        var $canvas = document.querySelector('.snake-canvas'),
            game = new Game(new Canvas($canvas));

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
                        game.setDirection(Direction.up);
                        break;
                    case 40:
                        e.preventDefault();
                        game.setDirection(Direction.down);
                        break;
                    case 37:
                        game.setDirection(Direction.left);
                        break;
                    case 39:
                        game.setDirection(Direction.right);
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
                    headX = pos.left + (pos.width / game.map.size * head.x),
                    headY = pos.top + (pos.height / game.map.size * head.y);

                var diffX = e.pageX - headX,
                    diffY = e.pageY - headY;

                var dirX = diffX > 0 ? Direction.right : Direction.left,
                    dirY = diffY > 0 ? Direction.down : Direction.up;

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

}());
