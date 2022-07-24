// main.js
import { setThrottle } from './throttle.js';
import { makeEditable } from './editable.js';
import { updateModal } from './modal.js';
import { game, test } from './game.js';

const throttleGame = setThrottle(game, 100);
const throttleTest = setThrottle(test, 5000);

const modal = document.getElementById('modal');
const pre = document.querySelector('pre');

const cover = document.createElement('div');

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

const reset = () => {
    results.computer = 0;
    results.player = 0;
    results.tie = 0;
};

makeEditable(
    document.querySelector('h1'),
    document.querySelector('footer'),
    document.getElementById('message'),
    pre
);

pre.focus();

cover.classList.add('cover', 'hidden');
document.body.append(cover);

document.querySelectorAll('button').forEach(button =>
    button.addEventListener('pointerdown', event => {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
        event.preventDefault();
        throttleGame(button, event, results);
    })
);

document.getElementById('test').addEventListener('click', event => {
    throttleTest();
});

document.getElementById('reset').addEventListener('click', event => {
    reset();
});

document.addEventListener('player', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Player won that round!<br />' + JSON.stringify(results, null, 2);
    if (results.player >= 5) {
        document
            .querySelectorAll('button')
            .forEach(button => (button.inert = true));

        pre.style.alignItems = 'center';
        reset();

        updateModal(
            '<span class="results">🤯</span><br/>You won!',
            modal,
            cover
        );
    }
});

document.addEventListener('computer', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Computer won! So strong!<br />' + JSON.stringify(results, null, 2);
    if (results.computer >= 5) {
        document
            .querySelectorAll('button')
            .forEach(button => (button.inert = true));

        pre.style.alignItems = 'center';
        reset();
        updateModal(
            '<span class="results">😭</span><br/>You lost!',
            modal,
            cover
        );
    }
});

document.addEventListener('tie', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML = 'Tie game!<br />' + JSON.stringify(results, null, 2);
});
