// main.js

function computerPlay() {
    return ['rock', 'paper', 'scissors'].at(Math.floor(Math.random() * 3));
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

const results = {
    computer: 0,
    player: 0,
    tie: 0,
};

// each button click plays round -> updates based on outcome -> dispatch event
document.querySelectorAll('button').forEach(button =>
    button.addEventListener('click', event => {
        const outcome = playRound(event.target.textContent, computerPlay());
        document.querySelector('div').textContent = outcome;
        results[outcome]++;
        button.dispatchEvent(
            new CustomEvent(`${outcome}`, { bubbles: true })
        );
    })
);

document.addEventListener('player', event => {
    if (results.player == 5) {
        alert('You won!');
        reset();
    }
});

document.addEventListener('computer', event => {
    if (results.computer == 5) {
        alert('You lost!');
        reset();
    }
});

document.addEventListener('tie', event => {});
