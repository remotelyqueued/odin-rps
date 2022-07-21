// main.js
import { setThrottle } from './throttle.js';
import { makeEditable } from './editable.js';
import { updateModal } from './modal.js';
import { game, test } from './game.js';

const throttleGame = setThrottle(game, 100);
const throttleTest = setThrottle(test, 5000);

const modal = document.getElementById('modal');
const cover = document.createElement('div');

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

makeEditable(document.querySelector('h1'));
makeEditable(document.querySelector('pre'));
makeEditable(document.querySelector('footer'));

modal.classList.add('hidden');
cover.classList.add('cover', 'hidden');

document.body.append(cover);

document.querySelectorAll('button').forEach(button =>
    button.addEventListener('click', event => {
        throttleGame(button, event, results);
    })
);

document.querySelector('#test').addEventListener('click', event => {
    throttleTest();
});

document.querySelector('#reset').addEventListener('click', event => {
    results.computer = 0;
    results.player = 0;
    results.tie = 0;
});

document.addEventListener('player', event => {
    if (results.player >= 5) {
        results.computer = 0;
        results.player = 0;
        results.tie = 0;
        updateModal('<span>🤯</span><br/>You won!', modal, cover);
    }
});

document.addEventListener('computer', event => {
    if (results.computer >= 5) {
        results.computer = 0;
        results.player = 0;
        results.tie = 0;
        updateModal('<span>😭</span><br/>You lost!', modal, cover);
    }
});
