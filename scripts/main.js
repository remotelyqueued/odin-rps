// main.js
import { setThrottle } from './throttle.js';
import { makeEditable } from './editable.js';
import { updateModal } from './modal.js';
import { game, test } from './game.js';

const throttleGame = setThrottle(game, 400);
const throttleTest = setThrottle(test, 2000);

const main = document.body.querySelector('main');
const header = document.body.querySelector('header');
const footer = document.body.querySelector('footer');

const h1 = document.body.querySelector('h1');
const pre = document.getElementById('pre');

const modal = document.getElementById('modal');
const message = document.getElementById('message');
const cover = document.createElement('div');

cover.classList.add('cover', 'hidden');

document.body.append(cover);

const results = {
    player: 0,
    computer: 0,
    tie: 0,
};

const reset = () => {
    pre.style.alignItems = 'center';
    pre.innerText = 'results';
    results.computer = 0;
    results.player = 0;
    results.tie = 0;
};

function toggleInert() {
    main.toggleAttribute('inert');
    header.toggleAttribute('inert');
    footer.toggleAttribute('inert');
}

makeEditable(h1, footer, message, pre);

document.querySelectorAll('button').forEach(button =>
    button.addEventListener('pointerdown', event => {
        event.preventDefault();
        throttleGame(button, event, results);
    })
);

document.addEventListener('player', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Player won that round!<br />' +
        JSON.stringify(results, null, 2) +
        '<br />' +
        JSON.stringify(event.detail, null, 2);

    if (results.player >= 5) {
        toggleInert();

        updateModal(
            '<span class="results">🤯</span><br/>You won!',
            modal,
            cover,
            toggleInert,
            reset
        );
    }
});

document.addEventListener('computer', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Close game but computer won!<br />' +
        JSON.stringify(results, null, 2) +
        '<br />' +
        JSON.stringify(event.detail, null, 2);

    if (results.computer >= 5) {
        toggleInert();

        updateModal(
            '<span class="results">😭</span><br/>You lost!',
            modal,
            cover,
            toggleInert,
            reset
        );
    }
});

document.addEventListener('tie', event => {
    pre.style.alignItems = 'flex-start';
    pre.innerHTML =
        'Tie game!<br />' +
        JSON.stringify(results, null, 2) +
        '<br />' +
        JSON.stringify(event.detail, null, 2);
});

document.getElementById('test').addEventListener('click', event => {
    let results = throttleTest();
    pre.style.alignItems = 'center';
    pre.innerHTML = `
<span class="results">🏆</span>
30 million games:
player: ${results.player.toLocaleString()}
computer: ${results.computer.toLocaleString()}
tie: ${results.tie.toLocaleString()}
<strong>${results.winner} won!!</strong>`;
});

document.getElementById('reset').addEventListener('click', event => {
    reset();
});
