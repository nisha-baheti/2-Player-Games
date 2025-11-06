let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newgame_btn = document.querySelector("#newgame-btn");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn_O = true;

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

const resetGame = () =>{
    turn_O = true;
    enableBoxes();
    msg_container.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn_O){
            box.innerText = "O";
            turn_O = false;
        }else{
            box.innerText = "X";
            turn_O = true;
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
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableBoxes();
};

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
            msg.innerText = "It's a Draw!!!"
            msg_container.classList.remove("hide");
            disableBoxes();
        }
    }
};

newgame_btn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);