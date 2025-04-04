"use strict";
//Define elements!
const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".new-game");
const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");
const winOrTie = document.querySelector(".win-or-tie");
const
let turn = 0;
let gameOver = false;

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6], // anti-diagonal
];

//If cell is clicked, print designated symbol!
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    cell.textContent = turn === 0 ? "X" : "O";

    if (turn !== 0) {
      player1.classList.remove("turn-color");
      player0.classList.add("turn-color");
    } else {
      player0.classList.remove("turn-color");
      player1.classList.add("turn-color");
    }
    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      highlightWinner(winner.combo);
      announce(winner);
    } else if (checkTie()) {
      gameOver = true;
      announce(winner);
    } else {
      turn = 1 - turn; // Switch turns
    }
  });
});

//Check winner

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const symbol = cells[a].textContent;

    if (
      symbol !== "" &&
      symbol === cells[b].textContent &&
      symbol === cells[c].textContent
    ) {
      return { symbol, combo };
    }
  }
  return null;
}

function checkTie() {
  // If any cell is empty, it's not a tie
  for (let cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  // If no winner and all cells filled, it's a tie
  return true;
}

// Highlight winning combo
function highlightWinner(combo) {
  combo.forEach((index) => {
    cells[index].classList.add("winner");
  });
}

//Show win or tie field

const announce = function (winner) {
  winOrTie.classList.remove("hidden");

  if (winner) {
    const playerName = winner.symbol === "X" ? `Player 1` : `Player 2 `;
    winOrTie.textContent = `${playerName} wins!`;
  } else {
    winOrTie.textContent = `DRAW!`;
  }
};

//Reset cells
resetBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  turn = 0;
  gameOver = false;
  player1.classList.remove("turn-color");
  player0.classList.add("turn-color");
  winOrTie.classList.add("hidden");
});
