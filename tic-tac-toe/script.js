const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const resultText = document.getElementById("result");
const overlay = document.getElementById("overlay");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

let scores = JSON.parse(localStorage.getItem("tttScore")) || {X:0,O:0};

scoreX.textContent = scores.X;
scoreO.textContent = scores.O;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(c => c.addEventListener("click", () => {
  let i = c.dataset.i;
  if (!gameActive || board[i] !== "") return;

  move(i, currentPlayer);

  if (checkWin(currentPlayer)) return;

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 300);
  }
}));

function move(i, p) {
  board[i] = p;
  cells[i].textContent = p;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnText.textContent = currentPlayer;
}

function aiMove() {
  let best = minimax(board, "O").index;
  move(best, "O");
  checkWin("O");
}

// 🔴 UNBEATABLE AI
function minimax(newBoard, player) {
  let avail = newBoard.map((v,i)=>v===""?i:null).filter(v=>v!==null);

  if (checkWinner(newBoard, "X")) return {score:-10};
  if (checkWinner(newBoard, "O")) return {score:10};
  if (avail.length === 0) return {score:0};

  let moves = [];

  for (let i of avail) {
    let move = {};
    move.index = i;
    newBoard[i] = player;

    let result = minimax(newBoard, player==="O"?"X":"O");
    move.score = result.score;

    newBoard[i] = "";
    moves.push(move);
  }

  return moves.reduce((a,b)=> player==="O" ? (a.score>b.score?a:b) : (a.score<b.score?a:b));
}

function checkWinner(b, p) {
  return wins.some(w => w.every(i => b[i]===p));
}

function checkWin(p) {
  for (let w of wins) {
    if (w.every(i => board[i]===p)) {

      gameActive = false;

      w.forEach(i => cells[i].classList.add("win"));

      showOverlay(p + " Wins!");

      scores[p]++;
      localStorage.setItem("tttScore", JSON.stringify(scores));

      scoreX.textContent = scores.X;
      scoreO.textContent = scores.O;

      return true;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    showOverlay("Draw!");
  }
}

function showOverlay(msg) {
  overlay.style.display = "flex";
  overlay.textContent = msg;

  setTimeout(()=> overlay.style.display="none", 1200);
}

function resetGame() {
  board = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  turnText.textContent = "X";

  cells.forEach(c=>{
    c.textContent="";
    c.classList.remove("win");
  });
}

function setMode(m) {
  mode = m;
  resetGame();
}