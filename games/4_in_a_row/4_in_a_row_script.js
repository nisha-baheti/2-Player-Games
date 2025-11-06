const columns = document.querySelectorAll(".column");
const reset_btn = document.querySelector("#reset-btn");
const newgame_btn = document.querySelector("#newgame-btn");
const msg_container = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let boxes = document.querySelectorAll(".box");

const ROWS = 6;
const COLS = 7;

let turn_O = true;
let gameOver = false;

let grid = [];

for(let r=0; r<ROWS; r++){
    let row = [];
    for(let c=0; c<COLS; c++){
        row.push(boxes[ROWS*c+r]);
    }
    grid.push(row);
}

const resetGame = () => {
    turn_O = true;
    msg_container.classList.add("hide");
    gameOver = false;
    for(let r=0; r<ROWS; r++){
        for(let c=0; c<COLS; c++){
            grid[r][c].classList.remove("player1","player2","win");
        }
    }
};

const getLowestEmptyRow = (col) => {
    for(let r = ROWS-1; r >=0; r--){
        if(!grid[r][col].classList.contains("player1") &&
           !grid[r][col].classList.contains("player2")){
               return r;
           }
    }
    return -1;
};

const checkWinner = () => {
    const directions = [
        {dr:0, dc:1}, {dr:1, dc:0}, {dr:1, dc:1}, {dr:-1, dc:1}
    ];

    for(let r=0; r<ROWS; r++){
        for(let c=0; c<COLS; c++){
            const player = grid[r][c].classList.contains("player1") ? 1 :
                           grid[r][c].classList.contains("player2") ? 2 : 0;
            if(player === 0) continue;

            for(const d of directions){
                let count = 1;
                let winCells = [{r,c}];
                for(let k=1; k<4; k++){
                    const rr = r + d.dr*k;
                    const cc = c + d.dc*k;
                    if(rr>=0 && rr<ROWS && cc>=0 && cc<COLS){
                        const nextPlayer = grid[rr][cc].classList.contains("player1") ? 1 :
                                           grid[rr][cc].classList.contains("player2") ? 2 : 0;
                        if(nextPlayer === player){
                            count++;
                            winCells.push({r:rr,c:cc});
                        } else break;
                    }
                }
                if(count === 4){
                    winCells.forEach(cell => grid[cell.r][cell.c].classList.add("win"));
                    return player;
                }
            }
        }
    }
    return 0;
};

const checkDraw = () => {
    for(let r=0;r<ROWS;r++){
        for(let c=0;c<COLS;c++){
            if(!grid[r][c].classList.contains("player1") &&
               !grid[r][c].classList.contains("player2")) return false;
        }
    }
    return true;
};

columns.forEach((colEl, colIndex) => {
    colEl.addEventListener("click", () => {
        if(gameOver) return;

        const rowIndex = getLowestEmptyRow(colIndex);
        if(rowIndex === -1) return;

        const playerClass = turn_O ? "player1" : "player2";
        grid[rowIndex][colIndex].classList.add(playerClass);

        const winner = checkWinner();
        if(winner){
            msg.innerText = `Congratulations! Winner is ${winner===1?"Player 1 (Gold)":"Player 2 (Aqua)"}`;
            msg_container.classList.remove("hide");
            gameOver = true;
            return;
        }

        if(checkDraw()){
            msg.innerText = "It's a Draw!!!";
            msg_container.classList.remove("hide");
            gameOver = true;
            return;
        }

        turn_O = !turn_O;
    });
});

newgame_btn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
