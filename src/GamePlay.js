(function () {

    'use strict';

    /**
     *
     * @param {Array} haystack
     * @param {Block} needle
     */
    var findInArray = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].equals(needle)) {
                return haystack[i];
            }
        }
    };

    /**
     *
     * @param {Array} haystack
     * @param {Block} needle
     */
    var findDuplicate = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].equals(needle) && haystack[i] !== needle) {
                return haystack[i];
            }
        }
    };

    var dependencies = [
        'src/RainbowGenerator',
        'src/levels/First',
        'src/levels/Second',
        'src/StopGameError'
    ];

    define(dependencies, function (Generator, FirstLevel, SecondLevel, StopGameError) {
        /**
         *
         * @param {Game} game
         * @constructor
         */
        var GamePlay = function GamePlay(game) {
            /**
             *
             * @type {Generator}
             */
            this.generator = new Generator();

            /**
             *
             * @type {FirstLevel}
             */
            this.level = null;

            /**
             *
             * @type {Game}
             */
            this.game = game;
        };

        GamePlay.fn = GamePlay.prototype;

        /**
         *
         * @param {Number} tick
         */
        GamePlay.fn.doTick = function (tick) {
            var game = this.game,
                snake = game.snake,
                map = game.map;

            if (game.level === 1 && game.score > 19) {
                game.updateLevel(2);
                this.startLevel(new SecondLevel());
            }

            snake.move();
            map.draw(snake.parts);

            // Spawn food every 20 ticks
            if (tick % 20 == 0 && map.food.length === 0) {
                this.spawnFood();
            }

            // Consume food
            if (findInArray(map.food, snake.parts[0])) {
                this.consumeFood();
            }

            // Test if the snake hit the border
            if (!map.contains(snake.head)) {
                snake.back();
                map.draw(snake.parts);

                throw new StopGameError(game);
            }

            // Test if snake hit an obstacle
            if (findInArray(map.obstacles, snake.head)) {
                snake.back();
                map.draw(snake.parts);

                throw new StopGameError(game);
            }

            // Prevent the snake from biting itself
            if (findDuplicate(snake.parts, snake.parts[0])) {
                snake.back();
                map.draw(snake.parts);

                throw new StopGameError(game);
            }
        };

        /**
         * Spawns food on a random empty block
         */
        GamePlay.fn.spawnFood = function () {
            var block = this.game.map.getRandomVacantBlock();
            block.color = this.generator.get();

            this.game.map.food = [block];
        };

        GamePlay.fn.consumeFood = function () {
            var game = this.game;

            game.snake.grow(game.map.food[0]);
            game.map.food = [];

            game.updateScore(game.score + this.level.multiplier);
        };

        GamePlay.fn.start = function () {
            this.game.updateLevel(1);
            this.startLevel(new FirstLevel());
        };

        /**
         *
         * @param {{}} level
         */
        GamePlay.fn.startLevel = function (level) {
            var game = this.game;

            this.level = level;

            // Set game presets from the level.
            game.snake.parts = [level.initialBlock];
            game.snake.direction = 0;
            game.speed = level.tickSpeed;

            game.setMap(level.map);
            game.updateScore(game.score + level.entryScore);

            // Get snake color from generator
            this.game.snake.head.color = this.generator.get();
        };

        return GamePlay;
    });
})();