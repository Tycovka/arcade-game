export class Score {
  constructor() {
    this.points = 0;
    this.level = 1;
    this.threshold = 50; // очков на следующий уровень
  }

  increase() {
    this.points++;
    if (this.points % this.threshold === 0) {
      this.level++;
    }
  }

  reset() {
    this.points = 0;
    this.level = 1;
  }

  draw() {
    document.getElementById("score").textContent = this.points;
    document.getElementById("level").textContent = this.level;
  }

  getLevel() {
    return this.level;
  }
}
