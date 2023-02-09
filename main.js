const table = document.querySelector(".playerVsPlayer");
const table2 = document.querySelector(".playerVsComputer");
const board = document.querySelector(".board");
const enterName = document.querySelector(".enterName");
const enterNames = document.querySelector("#enterName");
const squares = document.querySelectorAll(
  ".one, .two, .three, .four, .five, .six, .seven, .eight, .nine"
);
const winner = document.querySelector(".winner");
const restart = document.querySelector(".restart");
const Status = document.getElementById("Status");
let squareArray = Array.from(squares);
window.addEventListener("click", function (event) {
  if (event.target == table) {
    table.style.display = "none";
    table2.style.display = "none";
    playerChoice("player");
  } else if (event.target == table2) {
    table.style.display = "none";
    table2.style.display = "none";
    playerChoice("computer");
  }
});

function playerChoice(choice) {
  if (choice == "player") {
    enterName.style.display = "block";
    playervsplayer();
  } else {
    enterNames.style.display = "block";
    playervscomputer();
  }
}
function playervsplayer() {
  const playerNames = document.querySelector(".enterName");
  playerNames.addEventListener("submit", function (event) {
    event.preventDefault();
    let player1 = document.querySelector("#player1").value;
    let player2 = document.querySelector("#player2").value;
    playGame(player1, player2);
  });
}
function playervscomputer() {
  const playerNames = document.querySelector("#enterName");
  playerNames.addEventListener("submit", function (event) {
    event.preventDefault();
    let player11 = document.querySelector("#player11").value;
    let player2 = "Computer";
    computerAi(player11, player2);
  });
}

let currentPlayer = "O";

function playGame(player1, player2) {
  enterName.style.display = "none";
  enterNames.style.display = "none";
  board.style.display = "block";
  Status.style.display = "block";
  Status.innerHTML = `${player1} turn "O"`;
  squareArray.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent === "") {
        square.textContent = currentPlayer;
        if (currentPlayer === "O") {
          currentPlayer = "X";
          Status.innerHTML = `${player2} turn "X"`;
        } else {
          currentPlayer = "O";
          Status.innerHTML = `${player1} turn "O"`;
        }
        if (checkForWin(player1, player2)){
          return;
        };
      }
    });
  });
}

function checkForWin(player1, player2) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 4, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
  ];
  let loserName;
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (
      squareArray[a].textContent === currentPlayer &&
      squareArray[b].textContent === currentPlayer &&
      squareArray[c].textContent === currentPlayer
    ) {
      if (currentPlayer == "O") {
        currentPlayer = player1;
        loserName = player2;
      } else {
        currentPlayer = player2;
        loserName = player1;
      }
      if (player2 === "Computer") {
        currentPlayer = player1;
        loserName = player2;
      }
      board.style.display = "none";
      winner.style.display = "block";
      Status.style.display = "block";
      winner.innerHTML = `Congrats ${currentPlayer}, 
                          you defeated ${loserName}`;
      restart.style.display = "block";
      restart.addEventListener("click", function () {
        location.reload();
      });
      return;
    }
  }
}

function computerAi(player11, player2) {
  enterName.style.display = "none";
  enterNames.style.display = "none";
  board.style.display = "block";
  Status.style.display = "block";
  Status.innerHTML = `${player11} turn "O"`;
  squareArray.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent === "") {
        square.textContent = currentPlayer;
        if (currentPlayer === "O") {
          let availableSquares = squareArray.filter(
            (sq) => sq.textContent === ""
          );
          let randomChoice =
            availableSquares[
              Math.floor(Math.random() * availableSquares.length)
            ];
          randomChoice.textContent = "X";
          Status.innerHTML = `Computer turn "X"`;
        }
        checkForWin(player11, player2);
      }
    });
  });
}
