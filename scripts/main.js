// main.js

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

const throttleGame = setThrottle(game, 100);
const throttleTest = setThrottle(test, 5000);

function computerPlay() {
    return ['rock', 'paper', 'scissors'].at(Math.floor(Math.random() * 3));
}

function game(button, event) {
    const outcome = playRound(event.target.textContent, computerPlay());
    results[outcome]++;
    setPre(outcome);
    button.dispatchEvent(new CustomEvent(`${outcome}`, { bubbles: true }));
}

function playRound(playerSelection, computerSelection) {
    switch (playerSelection.toLowerCase()) {
        case 'rock':
            switch (computerSelection) {
                case 'rock':
                    return 'tie';
                case 'paper':
                    return 'computer';
                case 'scissors':
                    return 'player';
            }

        case 'paper':
            if (computerSelection === 'rock') {
                return 'player';
            } else if (computerSelection === 'paper') {
                return 'tie';
            } else {
                return 'computer';
            }

        case 'scissors':
            return computerSelection == 'rock'
                ? 'computer'
                : computerSelection == 'paper'
                ? 'player'
                : 'tie';

        default:
            return 'Invalid entry';
    }
}

function reset() {
    results.computer = 0;
    results.player = 0;
    results.tie = 0;
}

function setThrottle(callback, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;
    return function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        isThrottled = true;
        callback.apply(this, arguments);
        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    };
}

// each button click calls a wrapper around game
document.querySelectorAll('button').forEach(button =>
    button.addEventListener('click', event => {
        throttleGame(button, event);
    })
);

document.addEventListener('player', event => {
    if (results.player >= 5) {
        setPre('<span>🤯</span><br/>You won!');
        reset();
    }
});

document.addEventListener('computer', event => {
    if (results.computer >= 5) {
        setPre('<span>😭</span><br/>You lost!');
        reset();
    }
});

// nothing happens if a tie occurs
// document.addEventListener('tie', event => {});

function setPre(string) {
    document.querySelector('pre').innerHTML = string;
}

function test() {
    const count = {
        player: 0,
        computer: 0,
        tie: 0,
    };
    // for each choice play the game 10mil times
    const choices = ['rock', 'paper', 'scissors'];
    choices.forEach(option => {
        for (let i = 0; i < 10_000_000; i++) {
            const result = playRound(option, computerPlay());
            count[result]++;
        }
    });
    // note: Object.values iterates over all ennumerable properties
    let highScore = Math.max(...Object.values(count));
    let winner = Object.keys(count).find(key => count[key] === highScore);

    if (winner === 'tie') {
        winner = `${winner} won!...wait wut`;
    } else {
        winner = `${winner} won!!!`;
    }

    setPre(`
    <span>🏆</span>
    after 30 million games:
    player: ${count.player.toLocaleString()}
    computer: ${count.computer.toLocaleString()}
    tie: ${count.tie.toLocaleString()}
    ${winner}
    `);
}
