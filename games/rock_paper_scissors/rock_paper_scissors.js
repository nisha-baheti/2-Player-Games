let choices = {};
let scores = { 1: 0, 2: 0 };
let locked = { 1: false, 2: false }; // 🔒 Track if a player has already chosen

function play(player, choice) {
  // Prevent changing choice after first selection
  if (locked[player]) return;

  choices[player] = choice;
  locked[player] = true; // Lock the player’s choice

  if (player === 1 && !choices[2]) {
    document.getElementById("status").innerText = "Player 1 has chosen… waiting for Player 2";
  } else if (player === 2 && !choices[1]) {
    document.getElementById("status").innerText = "Player 2 has chosen… waiting for Player 1";
  }

  if (choices[1] && choices[2]) {
    checkWinner();
    // Reset for next round after small delay
    setTimeout(() => {
      choices = {};
      locked = { 1: false, 2: false };
      document.getElementById("status").innerText = "Next round! Choose your moves!";
    }, 1500);
  }
}

function checkWinner() {
  const p1 = choices[1];
  const p2 = choices[2];
  let result = "";

  if (p1 === p2) {
    result = "It's a Tie!";
  } else if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    result = "Player 1 Wins!";
    scores[1]++;
  } else {
    result = "Player 2 Wins!";
    scores[2]++;
  }

  document.getElementById("score1").innerText = scores[1];
  document.getElementById("score2").innerText = scores[2];
  document.getElementById("status").innerText = result;
}

function resetGame() {
  scores = { 1: 0, 2: 0 };
  choices = {};
  locked = { 1: false, 2: false };
  document.getElementById("score1").innerText = 0;
  document.getElementById("score2").innerText = 0;
  document.getElementById("status").innerText = "Player 1 and Player 2: Choose your moves!";
}