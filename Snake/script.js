const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 420;

const size = 20;

let snake, dir, foods, running, score, best, lives, game, difficulty;

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const speedEl = document.getElementById("speed");
const livesEl = document.getElementById("lives");

const overlay = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const finalBest = document.getElementById("finalBest");

best = localStorage.getItem("best") || 0;
bestEl.innerText = best;

function init(){
  snake = [{x:200,y:200}];
  dir = "RIGHT";
  foods = [];
  running = false;
  score = 0;
  lives = 3;
  difficulty = "medium";

  for(let i=0;i<6;i++) spawnFood();

  updateHUD();
}

init();

// SPEED
function getSpeed(){
  return {easy:200, medium:140, hard:90}[difficulty];
}

// START / PAUSE
function startGame(){
  overlay.classList.add("hidden");

  if(running) return;

  running = true;
  clearInterval(game);
  game = setInterval(loop, getSpeed());
}

window.toggleGame = function(){
  if(running){
    clearInterval(game);
    running = false;
  } else {
    startGame();
  }
};

window.restartGame = function(){
  overlay.classList.add("hidden");
  clearInterval(game);
  init();
  startGame();
};

// DIFFICULTY
window.setDifficulty = function(level){
  difficulty = level;
  if(running){
    clearInterval(game);
    game = setInterval(loop, getSpeed());
  }
};

// FOOD
function spawnFood(){
  foods.push({
    x: Math.floor(Math.random()*20)*size,
    y: Math.floor(Math.random()*20)*size,
    pulse: Math.random()*100
  });
}

// DRAW
function draw(){
  ctx.fillStyle="#001a2b";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // grid
  ctx.strokeStyle="rgba(0,180,255,0.06)";
  for(let i=0;i<20;i++){
    ctx.beginPath();
    ctx.moveTo(i*size,0);
    ctx.lineTo(i*size,canvas.height);
    ctx.stroke();
  }

  // food
  foods.forEach(f=>{
    ctx.fillStyle="#4fc3ff";
    ctx.shadowColor="#4fc3ff";
    ctx.shadowBlur=15;
    ctx.fillRect(f.x,f.y,size,size);
  });

  ctx.shadowBlur=0;

  // snake
  snake.forEach((s,i)=>{
    ctx.fillStyle = i===0 ? "#00e5ff" : "#0099ff";
    ctx.fillRect(s.x,s.y,size,size);
  });
}

// MOVE
function move(){
  if(!running) return;

  let head = {...snake[0]};

  if(dir==="LEFT") head.x-=size;
  if(dir==="RIGHT") head.x+=size;
  if(dir==="UP") head.y-=size;
  if(dir==="DOWN") head.y+=size;

  let collision =
    head.x<0 ||
    head.y<0 ||
    head.x>=canvas.width ||
    head.y>=canvas.height ||
    snake.some(s=>s.x===head.x && s.y===head.y);

  if(collision){
    lives--;
    if(lives<=0){
      gameOver();
      return;
    }
    snake = [{x:200,y:200}];
    dir="RIGHT";
    updateHUD();
    return;
  }

  snake.unshift(head);

  let ate=false;
  foods.forEach((f,i)=>{
    if(head.x===f.x && head.y===f.y){
      ate=true;
      score++;
      foods[i]={
        x:Math.floor(Math.random()*20)*size,
        y:Math.floor(Math.random()*20)*size,
        pulse:0
      };
    }
  });

  if(!ate) snake.pop();

  updateHUD();
}

// HUD
function updateHUD(){
  scoreEl.innerText=score;
  livesEl.innerText="❤️".repeat(lives);

  if(score>best){
    best=score;
    localStorage.setItem("best",best);
    bestEl.innerText=best;
  }

  speedEl.innerText = Math.round(1000/getSpeed());
}

// GAME OVER
function gameOver(){
  clearInterval(game);
  running=false;

  finalScore.innerText="Score: "+score;
  finalBest.innerText="Best: "+best;

  overlay.classList.remove("hidden");
}

// LOOP
function loop(){
  move();
  draw();
}

// CONTROLS
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft" && dir!=="RIGHT") dir="LEFT";
  if(e.key==="ArrowRight" && dir!=="LEFT") dir="RIGHT";
  if(e.key==="ArrowUp" && dir!=="DOWN") dir="UP";
  if(e.key==="ArrowDown" && dir!=="UP") dir="DOWN";
});