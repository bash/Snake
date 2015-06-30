(function () {

    'use strict';

    // Todo: Clean up interface / Overlay on pause
    // Todo: obstacles
    // Todo: Cleaner Events / Direction update

    var main = function () {
        require(['src/Game', 'src/Canvas', 'src/Direction'], function (Game, Canvas, Direction) {
            var game = new Game(new Canvas(document.querySelector('.snake-canvas')));

            var $level = document.querySelector('.snake-level'),
                $score = document.querySelector('.snake-score');

            game.onScoreUpdate.addListener(function (e) {
                $score.innerText = e.detail.score;
            });

            game.onLevelUpdate.addListener(function (e) {
                $level.innerText = e.detail.level;
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
                        e.preventDefault();
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