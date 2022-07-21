// main.js
import { setThrottle } from './throttle.js';
import { updateModal } from './modal.js';
import { game, test } from './game.js';
import { makeEditable } from './editable.js';

const throttleGame = setThrottle(game, 100);
const throttleTest = setThrottle(test, 5000);

const modal = document.querySelector('#modal');
const cover = document.createElement('div');

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
    resetScore();
});

document.addEventListener('player', event => {
    if (getResult('player') >= 5) {
        resetScore();
        updateModal('<span>🤯</span><br/>You won!', modal, cover);
    }
});

document.addEventListener('computer', event => {
    if (getResult('computer') >= 5) {
        resetScore();
        updateModal('<span>😭</span><br/>You lost!', modal, cover);
    }
});

// document.addEventListener('tie', event => {});

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

export function getResult(name) {
    return results[name];
}

export function resetScore() {
    results.computer = 0;
    results.player = 0;
    results.tie = 0;
}
