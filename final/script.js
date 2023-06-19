let streak = 0;
let streakElement = document.getElementById("streak");

let playerScore = 0;
let playerScoreElement = document.getElementById("player-score");
let playerChoiceImage = document.getElementById("player-choice-img");

let computerScore = 0;
let computerScoreElement = document.getElementById("computer-score");
let computerChoiceImage = document.getElementById("computer-choice-img");

let roundResult = document.getElementById("round-result");

const images = {
  rock: "rock.png",
  paper: "paper.png",
  scissors: "scissors.png",
};

function playRound(playerSelection) {
  const computerSelection = computerPlay();
  const result = getResult(playerSelection, computerSelection);
  //   Update the score and display the result
  if (result === "win") {
    playerScore++;
    if (playerScore === 5) {
      streak++;
    }

    playerScoreElement.textContent = playerScore;
    playerChoiceImage.src = images[playerSelection];
    computerChoiceImage.src = images[computerSelection];

    roundResult.textContent = `You win! ${playerSelection} beats ${computerSelection} 🙌`;
  } else if (result === "lose") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    computerChoiceImage.src = images[computerSelection];
    playerChoiceImage.src = images[playerSelection];

    roundResult.textContent = `You lose! ${computerSelection} beats ${playerSelection} 😖`;
  } else if (result === "tie") {
    playerChoiceImage.src = images[playerSelection];
    computerChoiceImage.src = images[computerSelection];
    roundResult.textContent = "It's a tie! 🤷‍♂️";
  }

  // Checking if the game is over
  if (playerScore === 5) {
    streakElement.textContent = `Streak: ${streak}`;
    roundResult.textContent = "You win the game! 🎉";
    roundResult.style.color = "#00ff7f";
    roundResult.style.fontWeight = "bold";
    roundResult.style.textShadow = "0px 5px 30px #80ffbf";
    disableButtons();
  } else if (computerScore === 5) {
    streak = 0;
    streakElement.textContent = `Streak: ${streak}`;
    roundResult.textContent = "You lose the game! 🙁";
    roundResult.style.color = "#7b0828";
    roundResult.style.fontWeight = "bold";
    roundResult.style.textShadow = "0px 5px 30px #953953";
    disableButtons();
  }
}

// Get computer's move
function computerPlay() {
  const options = ["rock", "paper", "scissors"];
  const generateRandomIndex = Math.floor(Math.random() * options.length);
  return options[generateRandomIndex];
}

// Determining the winner of the round

function getResult(playerSelection, computerSelection) {
  if (playerSelection === "rock") {
    if (computerSelection === "scissors") {
      return "win";
    } else if (computerSelection === "paper") {
      return "lose";
    } else {
      return "tie";
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      return "win";
    } else if (computerSelection === "scissors") {
      return "lose";
    } else {
      return "tie";
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      return "win";
    } else if (computerSelection === "rock") {
      return "lose";
    } else {
      return "tie";
    }
  }
}

// Disable the game buttons when the game is over
function disableButtons() {
  const buttons = document.querySelectorAll(".option");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

// Reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  roundResult.textContent = "Make your move to start the game 🌟";
  roundResult.style.color = "#1f1e1e";
  roundResult.style.fontWeight = "normal";
  roundResult.style.textShadow = "none";

  // Enable the game buttons
  const buttons = document.querySelectorAll(".option");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

// Add event listeners to the game buttons
const buttons = document.querySelectorAll(".option");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    playRound(buttons[i].getAttribute("data-option"));
  });
}
