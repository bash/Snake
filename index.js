(function () {

    'use strict';

    // Todo: Pause (space bar)
    // Todo: Colored blocks
    // Todo: gameplay
    // Todo: food
    // Todo: obstacles

    var main = function () {
        require(['src/Game', 'src/Canvas', 'src/Snake'], function (Game, Canvas, Snake) {
            var game = new Game(new Canvas(document.querySelector('.snake-canvas')));

            window.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case 38:
                        game.snake.direction = Snake.DIRECTION_UP;
                        break;
                    case 40:
                        game.snake.direction = Snake.DIRECTION_DOWN;
                        break;
                    case 37:
                        game.snake.direction = Snake.DIRECTION_LEFT;
                        break;
                    case 39:
                        game.snake.direction = Snake.DIRECTION_RIGHT;
                        break;
                }
            });

            game.start(Snake.DIRECTION_DOWN);
        });
    };

    if (document.readyState == 'complete') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
})();