(function () {

    'use strict';

    // Todo: Clean up interface / Overlay on pause
    // Todo: obstacles
    // Todo: Cleaner Events / Direction update

    var main = function () {
        require(['src/Game', 'src/Canvas', 'src/Direction'], function (Game, Canvas, Direction) {
            var canvas, $canvas, game;

            $canvas = document.querySelector('.snake-canvas');
            canvas = new Canvas($canvas);
            game = new Game(canvas);

            $canvas.addEventListener('scoreUpdate', function (e) {
                document.querySelector('.snake-score').innerText = e.detail.score;
            });

            window.addEventListener('keydown', function (e) {
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
                    case 32:
                        game.over ? game.start() : game.pause();
                        break;
                }
            });

            game.start();
        });
    };

    if (document.readyState == 'complete') {
        main();
    } else {
        window.addEventListener('load', main);
    }
})();