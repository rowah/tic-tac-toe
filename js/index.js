//saving DOM reference nodes
const tiles = Array.from(document.querySelectorAll(".tile")); //1. Grabs all board titles and creates and array of tile
const playerDisplay = document.querySelector(".display-player");
const winnerAnnouncer = document.querySelector(".announcer");
const gameOver = document.querySelector(".gameover");
const resetButton = document.getElementById("reset");
const display = document.querySelector(".display");

//adds event listener to the tiles
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => playerAction(tile, index));
});

//adding global game control variables
let board = ["", "", "", "", "", "", "", "", ""]; //initializes a board with an array of 9 empty strings; it will hold the X and O values for every tile
let currentPlayer = "X"; //holds the sign for the player active in the current turn
let isGameActive = true; //true until someone wins or the game ends in a tie. In case of a tie or a win, it turns false so the remaining tiles will be inactive until a reset

//End game states
const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

//STORING WINNING CONDITIONS ON THE BOARD
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//determining valid player action; if the inner text of the tile clicked is X or O, the action is invalid else true
const isValidAction = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
};

//updating the board
//receives an index as a parameter and set the corresponding element in the board array from being empty to be the sign of our current player.
const updateBoard = (index) => {
  board[index] = currentPlayer;
};

//handling player change
const changePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; //ternary expression changes the current player's value. If it was X it will be O otherwise it'll be X
  playerDisplay.innerText = currentPlayer; //update the innerText of the playerDisplay and apply the new player class to it
};

//announcing the end game results
//function receives an end game type and update the innerText of the announcer DOM node based on the result
const announce = (type) => {
  switch (type) {
    case PLAYERO_WON:
      winnerAnnouncer.innerHTML = "Player O Won!";
      break;
    case PLAYERX_WON:
      winnerAnnouncer.innerHTML = "Player X Won!";
      break;
    case TIE:
      winnerAnnouncer.innerText = "It's a tie!";
  }

  winnerAnnouncer.classList.remove("hide");
  gameOver.classList.remove("hide");
  //display.innerHTML = "";
};

//Result evaluation
function handleResultValidation() {
  let roundWon = false; //create a roundWon variable and initialize it with false;
  //loop through the winningConditions array and check the board for each winning condition.
  for (let i = 0; i <= 7; i++) {
    const winningCondition = winningConditions[i];
    //create variables to compare
    const a = board[winningCondition[0]];
    const b = board[winningCondition[1]];
    const c = board[winningCondition[2]];
    //game continues if any of the tiles in the win condition still has empty strings;
    if (a === "" || b === "" || c === "") {
      continue; // skip to the next iteration since winning cannot occur with an empty tile in the win condition
    }
    //if the three variables are strictly equal
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  //After the loop check the value of the roundWon variable; true, announce a winner and set the game to inactive;
  if (roundWon) {
    //call announce function wth the current player as the winner
    announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return;
  }
  //If no winner yet check for empty tiles on the board and if we don't have a winner and there are no empty tiles left, we announce a tie
  if (!board.includes("")) announce(TIE);
}

//handling player actions
//function will be called when the user clicks a tile
//function receives a tile and an index as a parameter and is called when player clicks a file
const playerAction = (tile, index) => {
  //check if it is a valid action or not and check if the game is active currently or not.
  if (isValidAction(tile) && isGameActive) {
    //if both of them are true, update the innerText of the tile with the sign of the current player.
    tile.innerText = currentPlayer;
    //update the board array
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
};

//game reset
//set the board to consist of nine empty strings, set the game to active, remove the announcer and change the player back to X (by definition X starts always)
//loop through the tiles and set the innerText back to an empty string

const resetBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  winnerAnnouncer.classList.add("hide");
  gameOver.classList.add("hide");
  //display.innerHTML = `Player <span class="display-player">X</span>'s turn`;

  if (currentPlayer === "O") {
    changePlayer();
  }

  tiles.forEach((tile) => {
    tile.innerText = "";
  });
};

resetButton.addEventListener("click", resetBoard);
