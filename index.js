const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const gameWinningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
// This function takes the game to the starting phase
function gameInIt() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
//   ------------------ It clears the boxes from the UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player ~ ${currentPlayer}`;
}

gameInIt();

function checkGameOver() {
  let answer = "";
    // all three function should be non empty and same in value
  gameWinningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
        if(gameGrid[position[0]] === "X")
            answer = "X";
        else{
            answer = "O";
        }
        // Disable pointer Events
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });    
        // coloring the winning boxes
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
  });
    // winner to be shown in UI   
  if(answer !== ""){
    gameInfo.innerText = `Victory for ~ ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

//   Checking whether it's a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if(box !== "")
        fillCount++;
  });
//   all the boxes were filled and the game tied
  if(fillCount === 9){
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player ~ ${currentPlayer}`;
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", gameInIt);
