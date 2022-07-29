/**
 * game() plays a single round of rps
 * updates score object and dispatches a custom event on button
 *
 * @param {HTMLButtonElement} button
 * @param {PointerEvent} event
 * @param {Object} results
 */
export function game(button, event, results) {
    const computerChoice = computerPlay();
    const playerChoice = event.target.textContent.trim();
    const outcome = playRound(playerChoice, computerChoice);
    results[outcome]++;
    button.dispatchEvent(
        new CustomEvent(`${outcome}`, {
            bubbles: true,
            detail: {
                player: playerChoice,
                computer: computerChoice,
                winner: outcome,
            },
        })
    );
 }

/**
 * playround() returns winner of a single round, or invalid, as string
 *
 * @param {String} playerSelection
 * @param {String} computerSelection
 * @return {String} 'computer', 'player', 'tie', 'invalid'
 */
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

/**
 * computerPlay() makes the computers choice
 *
 * @return {String} 'rock', 'paper', 'scissors'
 */
function computerPlay() {
    return ['rock', 'paper', 'scissors'].at(Math.floor(Math.random() * 3));
}

/**
 * test() plays the game 30 million times
 * for each choice 'rock', 'paper', 'scissors'
 * the game is played 10 million times
 * 
 * @return {Object} the results of the 30 million plays
 */
export function test() {
    const count = {
        player: 0,
        computer: 0,
        tie: 0,
    };

    const choices = ['rock', 'paper', 'scissors'];

    choices.forEach(option => {
        for (let i = 0; i < 10_000_000; i++) {
            const result = playRound(option, computerPlay());
            count[result]++;
        }
    });

    // Object.values iterates over all ennumerable properties
    let highScore = Math.max(...Object.values(count));

    count.winner = Object.keys(count).find(key => count[key] === highScore);

    return count;
}
