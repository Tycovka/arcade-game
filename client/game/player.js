export class Player {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  handleInput(keys) {
    this.vx = 0;
    this.vy = 0;
    if (keys["ArrowLeft"]) this.vx = -this.speed;
    if (keys["ArrowRight"]) this.vx = this.speed;
    if (keys["ArrowUp"]) this.vy = -this.speed;
    if (keys["ArrowDown"]) this.vy = this.speed;
  }
}
