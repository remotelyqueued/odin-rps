// main.js
import { setThrottle } from './throttle.js';
import { makeEditable } from './editable.js';
import { updateModal } from './modal.js';
import { game, test } from './game.js';

const throttleGame = setThrottle(game, 100);
const throttleTest = setThrottle(test, 5000);

const main = document.body.querySelector('main');
const header = document.body.querySelector('header');
const footer = document.body.querySelector('footer');

const modal = document.getElementById('modal');
const cover = document.createElement('div');
cover.classList.add('cover', 'hidden');
document.body.append(cover);

const pre = document.querySelector('pre');

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
        toggleInert();
        reset();
        pre.style.alignItems = 'center';
        updateModal(
            '<span class="results">🤯</span><br/>You won!',
            modal,
            cover,
            toggleInert
        );
    }
});

document.addEventListener('computer', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Computer won! So strong!<br />' + JSON.stringify(results, null, 2);
    if (results.computer >= 5) {
        toggleInert();
        pre.style.alignItems = 'center';
        reset();
        updateModal(
            '<span class="results">😭</span><br/>You lost!',
            modal,
            cover,
            toggleInert
        );
    }
});

document.addEventListener('tie', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML = 'Tie game!<br />' + JSON.stringify(results, null, 2);
});

function toggleInert() {
    main.toggleAttribute('inert');
    header.toggleAttribute('inert');
    footer.toggleAttribute('inert');
}
