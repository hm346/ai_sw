/**
 * 玩家子弹 + 对象池
 */
const pool = [];

export class Bullet {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.width = 6;
    this.height = 14;
    this.speed = 8;
  }

  init(x, y) {
    this.active = true;
    this.x = x;
    this.y = y;
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.height / 2 < 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffe066';
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 6;
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.shadowBlur = 0;
  }
}

export function spawnBullet(x, y) {
  let b = pool.find(b => !b.active);
  if (!b) {
    b = new Bullet();
    pool.push(b);
  }
  b.init(x, y);
  return b;
}

export function getActiveBullets() {
  return pool.filter(b => b.active);
}

export function resetBullets() {
  pool.length = 0;
}
