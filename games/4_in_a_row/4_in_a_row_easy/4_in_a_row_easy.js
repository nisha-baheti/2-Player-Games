// --- Variables ---
const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 1;
let gameOver = false;
let scores = { 1: 0, 2: 0 };

const boardEl = document.getElementById("board");
const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const msg = document.getElementById("msg");
const msg_container = document.querySelector(".msg-container");

function showWinner() {
  msg_container.classList.remove("hide");
  setTimeout(() => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  }, 50);
}
// --- Create Board ---
function createBoard() {
  board = Array.from({ length: rows }, () => Array(cols).fill(0));
  boardEl.innerHTML = "";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleMove(c));
      boardEl.appendChild(cell);
    }
  }

  updateTurnDisplay();
  msgEl.textContent = "";
  gameOver = false;
}

// --- Handle Player Move ---
function handleMove(col) {
  if (gameOver) return;

  // Find the lowest empty cell in this column
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = currentPlayer;
      updateBoardUI();
      if (checkWin(r, col)) {
        msg.innerText = `🎉 Player ${currentPlayer} Wins! 🎉`;
        scores[currentPlayer]++;
        updateScores();
        showWinner();
        gameOver = true;
      } else if (isBoardFull()) {
        msg.innerText = "😅 It's a Draw!";
        showWinner();
        gameOver = true;
      } else {
        switchPlayer();
      }
      return;
    }
  }
}

// --- Switch Player ---
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnDisplay();
}

// --- Update Active Player Highlight ---
function updateTurnDisplay() {
  if (currentPlayer === 1) {
    player1El.classList.add("active");
    player2El.classList.remove("active");
  } else {
    player2El.classList.add("active");
    player1El.classList.remove("active");
  }
}

// --- Update Board UI ---
function updateBoardUI() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const r = cell.dataset.row;
    const c = cell.dataset.col;
    cell.classList.remove("player1", "player2");
    if (board[r][c] === 1) cell.classList.add("player1");
    else if (board[r][c] === 2) cell.classList.add("player2");
  });
}

// --- Check for Win ---
function checkWin(row, col) {
  const directions = [
    { r: 0, c: 1 },  // horizontal
    { r: 1, c: 0 },  // vertical
    { r: 1, c: 1 },  // diagonal \
    { r: 1, c: -1 }  // diagonal /
  ];

  for (const { r: dr, c: dc } of directions) {
    let count = 1;

    // Check both sides of the placed disc
    for (let i = 1; i < 4; i++) {
      const nr = row + dr * i;
      const nc = col + dc * i;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== currentPlayer) break;
      count++;
    }
    for (let i = 1; i < 4; i++) {
      const nr = row - dr * i;
      const nc = col - dc * i;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== currentPlayer) break;
      count++;
    }

    if (count >= 4) return true;
  }

  return false;
}

// --- Check Draw ---
function isBoardFull() {
  return board.every(row => row.every(cell => cell !== 0));
}

// --- Update Scores ---
function updateScores() {
  score1El.textContent = scores[1];
  score2El.textContent = scores[2];
}

// --- Reset Game ---
document.getElementById("newgame-btn").addEventListener("click", ()=>{
  msg_container.classList.add("hide");
  msg.innerText="";

  gameOver = false;
  currentPlayer = 1;
  updateTurnDisplay();
  createBoard();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  scores = { 1: 0, 2: 0 };
  updateScores();

  msg_container.classList.add("hide");
  msg.innerText="";
  
  gameOver = false;
  currentPlayer = 1;
  updateTurnDisplay();

  createBoard();
});

// --- Initialize ---
createBoard();
updateScores();
