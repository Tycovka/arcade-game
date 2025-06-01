export class Enemy {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  update(level = 1) {
  this.x -= this.speed + (level * 0.5); // увеличиваем скорость с каждым уровнем
  if (this.x + this.size < 0) {
    this.x = 800 + Math.random() * 200;
    this.y = Math.random() * 450;
  }
}


  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  collidesWith(player) {
    return (
      this.x < player.x + player.size &&
      this.x + this.size > player.x &&
      this.y < player.y + player.size &&
      this.y + this.size > player.y
    );
  }
}
