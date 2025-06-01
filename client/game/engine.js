import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Score } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Player(100, 100, 30, 5);
const enemies = [new Enemy(800, 100, 30, 3), new Enemy(1000, 200, 30, 4)];
const score = new Score();

let keys = {};
let isRunning = false;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

document.getElementById("startBtn").addEventListener("click", () => {
  score.reset();
  isRunning = true;
  gameLoop();
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
      alert("💥 Игра окончена!");
    }
  });

  score.increase();
  score.draw();

  requestAnimationFrame(gameLoop);
}
