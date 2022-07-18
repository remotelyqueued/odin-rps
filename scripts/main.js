// main.js

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

const throttle = setThrottle(game, 100);

function computerPlay() {
    return ['rock', 'paper', 'scissors'].at(Math.floor(Math.random() * 3));
}

function game(button, event) {
    console.log('4. game called...');
    const outcome = playRound(event.target.textContent, computerPlay());
    results[outcome]++;
    document.querySelector('div').textContent = outcome;
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
    console.log('1. setThrottle called...');
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    return function wrapper() {
        console.log('3. wrapper called...');
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


// each button click calls throttle() -> wrapper() -> game()
document.querySelectorAll('button').forEach(button =>
    button.addEventListener('click', event => {
        console.log('2. throttle called...');
        throttle(button, event);
    })
);

document.addEventListener('player', event => {
    console.log(results);
    if (results.player >= 5) {
        alert('You won!');
        reset();
    }
});

document.addEventListener('computer', event => {
    console.log(results);
    if (results.computer >= 5) {
        alert('You lost!');
        reset();
    }
});

document.addEventListener('tie', event => {
    console.log(results);
});
