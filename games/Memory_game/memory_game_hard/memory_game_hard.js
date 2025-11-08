const emojis = [
  "🍎","🍇","🍓","🐶","🐼","🦊","🐸","🦁","🐰","🐢",
  "🐨","🐙","🐝","🦋","🐍","🐬","🐧","🦄"
]; // 18 unique emojis

let grid = document.getElementById("game-grid");
let firstCard = null;
let lock = false;
let playerTurn = 1;
let score1 = 0, score2 = 0;
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const p1El = document.getElementById("player1");
const p2El = document.getElementById("player2");
const msg = document.getElementById("msg");
const msg_container = document.querySelector(".msg-container");

function checkWinner() {
  const totalPairs = emojis.length;
  if (score1 + score2 === totalPairs) {
    if (score1 > score2) {
      msg.innerText = "🎉 Player 1 Wins!";
    } else if (score2 > score1) {
      msg.innerText = "🎉 Player 2 Wins!";
    } else {
      msg.innerText = "🤝 It's a Tie!";
    }
    msg_container.classList.remove("hide");
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 50);

  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  grid.innerHTML = "";
  let cardsArray = [...emojis, ...emojis]; // 36 total
  shuffle(cardsArray);
  cardsArray.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${emoji}</div>
      <div class="back">?</div>
    `;
    card.addEventListener("click", () => flipCard(card, emoji));
    grid.appendChild(card);
  });
}

function flipCard(card, emoji) {
  if (lock || card.classList.contains("flipped")) return;
  card.classList.add("flipped");
  if (!firstCard) {
    firstCard = {card, emoji};
  } else {
    lock = true;
    if (firstCard.emoji === emoji) {
      if (playerTurn === 1) {
        score1++; score1El.textContent = score1;
      } else {
        score2++; score2El.textContent = score2;
      }
      firstCard = null;
      lock = false;
      checkWinner();
    } else {
      setTimeout(() => {
        card.classList.remove("flipped");
        firstCard.card.classList.remove("flipped");
        firstCard = null;
        switchTurn();
        lock = false;
      }, 1000);
    }
  }
}

function switchTurn() {
  playerTurn = playerTurn === 1 ? 2 : 1;
  p1El.classList.toggle("active", playerTurn === 1);
  p2El.classList.toggle("active", playerTurn === 2);
}

function resetGame() {
  score1 = 0; score2 = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  playerTurn = 1;
  p1El.classList.add("active");
  p2El.classList.remove("active");
  firstCard = null;
  lock = false;
  msg_container.classList.add("hide");
  msg.innerText="";
  createBoard();
}

resetGame();