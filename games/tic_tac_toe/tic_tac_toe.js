let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newgame_btn = document.querySelector("#newgame-btn");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

let turn_O = true;

let score_O = 0; 
let score_X = 0;

const win_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const newGame = () =>{
    turn_O = true;
    enableBoxes();
    msg_container.classList.add("hide");
    updateTurnDisplay();
};


const resetGame = () =>{
    turn_O = true;
    enableBoxes();
    msg_container.classList.add("hide");

    // reset scores
    score_O = 0;
    score_X = 0;
    updateScoreDisplay();

    updateTurnDisplay();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn_O){
            box.innerText = "O";
            turn_O = false;
            updateTurnDisplay();
        }else{
            box.innerText = "X";
            turn_O = true;
            updateTurnDisplay();
        }
        box.disabled = true;

        checkWinner();
    });
})

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    
    if (winner === "O") {
        msg.innerText = `🎉 Player 1 Wins!`;
        score_O++;
    } else if (winner === "X") {
        score_X++;
        msg.innerText = `🎉 Player 2 Wins!`;
    }
    msg_container.classList.remove("hide");
    disableBoxes();
    updateScoreDisplay();
};

function updateTurnDisplay() {
  if (turn_O) {
    player1El.classList.add("active");
    player2El.classList.remove("active");
  } else {
    player2El.classList.add("active");
    player1El.classList.remove("active");
  }
}

function updateScoreDisplay() {
    score1El.innerText = score_O;
    score2El.innerText = score_X;
}

const checkWinner = () => {
    let winnerFound = false;

    for(pattern of win_patterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                winnerFound = true;
                showWinner(pos1);
                break;
            }
        }
    }

    if(!winnerFound){
        let filledCount = 0;
        boxes.forEach(box => {
            if(box.innerText !== ""){
                filledCount++;
            }
        });

        if(filledCount === boxes.length){
            msg.innerText = "🤝 It's a Tie!"
            msg_container.classList.remove("hide");
            disableBoxes();
        }
    }
};

newgame_btn.addEventListener("click", newGame);
reset_btn.addEventListener("click", resetGame);
