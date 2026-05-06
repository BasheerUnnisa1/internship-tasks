const board = document.getElementById("board");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");

let solution = [];
let puzzle = [];
let lives = 3;
let timer = 0;
let interval;

// BASE SUDOKU
const base = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

// TIMER
function startTimer() {
  clearInterval(interval);
  timer = 0;
  timerDisplay.innerText = timer;

  interval = setInterval(() => {
    timer++;
    timerDisplay.innerText = timer;
  }, 1000);
}

// PUZZLE GENERATOR
function generate(level) {
  let copy = JSON.parse(JSON.stringify(base));

  let remove =
    level === "easy" ? 25 :
    level === "medium" ? 40 : 55;

  for (let i = 0; i < remove; i++) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    copy[r][c] = 0;
  }

  return copy;
}

// BUILD BOARD
function build(level = "easy") {
  board.innerHTML = "";
  lives = 3;
  livesDisplay.innerText = lives;

  puzzle = generate(level);
  solution = base;

  startTimer();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      let cell = document.createElement("input");
      cell.classList.add("cell");
      cell.maxLength = 1;

      if (puzzle[i][j] !== 0) {
        cell.value = puzzle[i][j];
        cell.disabled = true;
      }

      cell.dataset.r = i;
      cell.dataset.c = j;

      cell.addEventListener("input", check);

      board.appendChild(cell);
    }
  }
}

// CHECK
function check(e) {
  let cell = e.target;
  let r = cell.dataset.r;
  let c = cell.dataset.c;

  if (cell.value == solution[r][c]) {
    cell.classList.add("correct");
    cell.classList.remove("wrong");
  } else {
    cell.classList.add("wrong");
    lives--;
    livesDisplay.innerText = lives;

    setTimeout(() => {
      cell.value = "";
      cell.classList.remove("wrong");
    }, 300);

    if (lives <= 0) {
      clearInterval(interval);
      alert("Game Over 💀");
      build("easy");
    }
  }

  if (checkWin()) {
    clearInterval(interval);
    alert("YOU WIN 🎉 Time: " + timer + "s");
    build("easy");
  }
}

// WIN CHECK
function checkWin() {
  let cells = document.querySelectorAll(".cell");
  for (let c of cells) {
    if (c.value == "") return false;
  }
  return true;
}

// BUTTONS
function newGame(level) {
  build(level);
}

function resetGame() {
  build("easy");
}

// START
build("easy");