// main.js

/* randomly return: rock, paper, scissors */
function computerPlay() {
    return ['rock', 'paper', 'scissors'].at(Math.floor(Math.random() * 3));
}
/* takes two strings, returns string */
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

function game() {
    let playerWins = 0;
    let computerWins = 0;
    let tieGame = 0;

    for (let i = 0; i < 5; i++) {
        let result = playRound(
            prompt('Choose paper rock or scissors:', 'rock'),
            computerPlay()
        );
        switch (result) {
            case 'computer':
                console.log('Computer won!');
                computerWins++;
                break;
            case 'player':
                console.log('Player won!');
                playerWins++;
                break;
            case 'tie':
                console.log('A tie!');
                tieGame++;
                break;
            default:
                console.log('Invalid info I think!');
        }
    }
    if (playerWins > computerWins) {
        console.log('\nFinal score:');
        console.log('player wins:', playerWins);
        console.log('computer wins:', computerWins);
        console.log('tie games:', tieGame);
    } else if (computerWins > playerWins) {
        console.log('\nFinal score:');
        console.log('player wins:', playerWins);
        console.log('computer wins:', computerWins);
        console.log('tie games:', tieGame);
    } else {
        console.log('\nFinal score:');
        console.log('player wins:', playerWins);
        console.log('computer wins:', computerWins);
        console.log('tie games:', tieGame);
    }
}

// game();

// test: playRound()
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

let result = '';
console.log('rock:');
test(rock);
console.log('paper:');
test(paper);
console.log('scissors:');
test(scissors);

function test(choice) {
    let count = {
        player: 0,
        computer: 0,
        tie: 0,
    };
    for (let i = 0; i < 10_000_000; i++) {
        result = playRound(choice, computerPlay());
        count[result]++;
    }
    for (key in count) {
        console.log(key + ': ' + count[key].toLocaleString());
    }
}

// test: computerPlay()
// let count = {
//     rock: 0,
//     paper: 0,
//     scissors: 0,
// };

// let result = '';
// for (let i = 0; i < 10_000_000; i++) {
//     result = computerPlay();
//     count[result]++;
// }

// for (key in count) {
//     console.log(key + ': ' + count[key].toLocaleString());
// }
