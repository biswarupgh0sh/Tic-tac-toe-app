//variables
const eachCell = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".resetBtn");
const statusTxt = document.querySelector(".statusTxt");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let running = false;
//let's start the game
initializeGame();

//all the functions
function initializeGame(){
    eachCell.forEach(cell => cell.addEventListener('click' , cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusTxt.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O":"X";
    statusTxt.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i=0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        statusTxt.textContent = `${currentPlayer} wins!`;
        running = false;
    }else if(!options.includes("")){
        statusTxt.textContent = "It's a tie";
        running = false;
    }else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusTxt.textContent = `${currentPlayer}'s turn`;
    eachCell.forEach(cell => cell.textContent = "");
    running = true;
}
