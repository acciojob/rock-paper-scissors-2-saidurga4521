//your code here
const turnsInput = document.getElementById('game_number'); 
const playBtn = document.getElementById('play_game');
const game = document.getElementById('game');

let userPoints = 0;
let computerPoints = 0;
let turnsLeft = 0;

// Create and append UI elements once
const cPointE1 = document.createElement('p');
cPointE1.id = "computer_points";
cPointE1.textContent = `Computer Points: ${computerPoints}`;

const upointsE1 = document.createElement('p');
upointsE1.id = "user_points";
upointsE1.textContent = `User Points: ${userPoints}`;

const computerChoose = document.createElement('p');
computerChoose.id = "computer_choose";

const roundResult = document.createElement('p');
roundResult.id = "round_result";

const turnsLeftE1 = document.createElement('p');
turnsLeftE1.id = "turns_left";

const finalResult = document.createElement('p');
finalResult.id = "final_result";

game.appendChild(cPointE1);
game.appendChild(upointsE1);
game.appendChild(computerChoose);
game.appendChild(roundResult);
game.appendChild(turnsLeftE1);
game.appendChild(finalResult);

playBtn.addEventListener('click', () => {
    turnsLeft = parseInt(turnsInput.value) || 5; // Default to 5 turns if input is empty
    finalResult.textContent = ""; // Reset final result
    turnsLeftE1.textContent = `Turns Left: ${turnsLeft}`;

    // Prevent creating multiple sets of buttons
    if (!document.querySelector('.options')) {
        const options = document.createElement('div');
        options.classList.add('options');

        const choices = ['scissors', 'rock', 'paper'];

        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice');
            button.id = choice;
            options.appendChild(button);
        });

        game.appendChild(options);

        // Add event listeners to buttons
        document.querySelectorAll('.choice').forEach(button => {
            button.addEventListener('click', () => {
                if (turnsLeft > 0) {
                    const userChoice = button.id;
                    const computerChoice = choices[Math.floor(Math.random() * 3)];

                    let result = "";
                    if (userChoice === computerChoice) {
                        result = "TIE";
                    } else if (
                        (userChoice === "rock" && computerChoice === "scissors") ||
                        (userChoice === "paper" && computerChoice === "rock") ||
                        (userChoice === "scissors" && computerChoice === "paper")
                    ) {
                        result = "WON";
                        userPoints += 1;
                    } else {
                        result = "LOSE";
                        computerPoints += 1;
                    }

                    // Update existing elements
                    computerChoose.textContent = `Computer: ${computerChoice}`;
                    roundResult.textContent = `Result: ${result}`;
                    upointsE1.textContent = `User Points: ${userPoints}`;
                    cPointE1.textContent = `Computer Points: ${computerPoints}`;

                    turnsLeft -= 1;
                    turnsLeftE1.textContent = `Turns Left: ${turnsLeft}`;

                    if (turnsLeft === 0) {
                        // Display final result
                        if (userPoints > computerPoints) {
                            finalResult.textContent = "You won the game!";
                        } else if (computerPoints > userPoints) {
                            finalResult.textContent = "Computer won the game!";
                        } else {
                            finalResult.textContent = "It's a tie!";
                        }

                        // Disable buttons after game ends
                        document.querySelectorAll('.choice').forEach(btn => {
                            btn.disabled = true;
                        });
                    }
                }
            });
        });
    }
});

