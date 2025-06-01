import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Score } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Player(100, 100, 30, 5);
const enemies = [new Enemy(800, 100, 30, 3), new Enemy(1000, 200, 30, 4)];
const score = new Score();
const saveBtn = document.getElementById("saveBtn");


let keys = {};
let isRunning = false;



document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

document.getElementById("startBtn").addEventListener("click", () => {
  score.reset();
  isRunning = true;
  gameLoop();
});

saveBtn.addEventListener("click", () => {
  const name = prompt("Введите ваше имя:");
  if (!name) return;

  fetch("http://localhost:3000/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, points: score.points }),
  })
    .then((res) => res.json())
    .then(() => {
      saveBtn.style.display = "none";
      loadLeaderboard();
    });
});


function gameLoop() {
  if (!isRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.handleInput(keys);
  player.update();
  player.draw(ctx);

  enemies.forEach(enemy => {
    enemy.update(score.getLevel());
    enemy.draw(ctx);

    if (enemy.collidesWith(player)) {
      isRunning = false;
      saveBtn.style.display = "inline";
      alert("💥 Игра окончена!");
    }

  });

  function loadLeaderboard() {
  fetch("http://localhost:3000/scores")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("scoresList");
      list.innerHTML = "";
      data.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.points} очков`;
        list.appendChild(li);
      });
    });
}


  score.increase();
  score.draw();
  loadLeaderboard();


  requestAnimationFrame(gameLoop);
}
