/**
 * 爆炸粒子 + 对象池
 */
const pool = [];

export class Particle {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;
    this.maxLife = 0;
    this.color = '#fff';
    this.size = 0;
  }

  init(x, y, color, speed = 3, size = 2, life = 20) {
    this.active = true;
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const spd = speed * (0.5 + Math.random());
    this.vx = Math.cos(angle) * spd;
    this.vy = Math.sin(angle) * spd;
    this.life = life;
    this.maxLife = life;
    this.color = color;
    this.size = size;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // 微重力
    this.life--;
    if (this.life <= 0) this.active = false;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    const s = this.size * alpha;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = alpha;
    ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
    ctx.globalAlpha = 1;
  }
}

export function spawnExplosion(x, y, count = 12) {
  const colors = ['#ff6b6b', '#ff922b', '#ffe066', '#fff'];
  for (let i = 0; i < count; i++) {
    let p = pool.find(p => !p.active);
    if (!p) {
      p = new Particle();
      pool.push(p);
    }
    p.init(x, y, colors[Math.floor(Math.random() * colors.length)], 2 + Math.random() * 3, 2 + Math.random() * 3, 15 + Math.random() * 15);
  }
}

export function getActiveParticles() {
  return pool.filter(p => p.active);
}

export function resetParticles() {
  pool.length = 0;
}
