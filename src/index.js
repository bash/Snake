/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { onReady } from './dom';
import { Direction } from './direction';
import { Canvas } from './canvas';
import { Game } from './game/game';

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
        game.updateScore(100);
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