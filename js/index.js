//saving DOM reference nodes
const tiles = Array.from(document.querySelectorAll(".tile")); //1. Grabs all board titles and creates and array of tile
const playerDisplay = document.querySelector(".display-player");
const winnerAnnouncer = document.querySelector(".announcer");
const resetButton = document.getElementById("reset");

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

//determining valid player action; if the inner text of the time clicked is X or O, the action is invalid else true
const isValidAction = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
};
