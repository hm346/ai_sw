/**
 * 敌机 + 对象池
 * 从顶部随机位置生成，向下移动
 */
const pool = [];
let canvasW = 0;
let canvasH = 0;

export class Enemy {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.speed = 0;
    this.type = 0; // 0=小兵, 1=中型, 2=大型
  }

  init(x, y, type = 0) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.type = type;

    switch (type) {
      case 0: // 小兵
        this.width = 28;
        this.height = 28;
        this.speed = 2 + Math.random() * 2;
        break;
      case 1: // 中型
        this.width = 40;
        this.height = 40;
        this.speed = 1.5 + Math.random() * 1;
        break;
      case 2: // 大型
        this.width = 56;
        this.height = 56;
        this.speed = 0.8 + Math.random() * 0.8;
        break;
    }
  }

  update() {
    this.y += this.speed;
    if (this.y - this.height / 2 > canvasH) {
      this.active = false;
    }
  }

  draw(ctx) {
    const { x, y, width: w, height: h, type } = this;

    ctx.save();
    ctx.translate(x, y);

    // 颜色随类型变化
    const colors = ['#ff6b6b', '#ff922b', '#f06595'];
    ctx.fillStyle = colors[type];

    // 机身（倒三角）
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(0, h / 3);
    ctx.lineTo(w / 2, h / 2);
    ctx.closePath();
    ctx.fill();

    // 核心
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, -2, w * 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

export function setCanvasSize(w, h) {
  canvasW = w;
  canvasH = h;
}

export function spawnEnemy(x, y, type = 0) {
  let e = pool.find(e => !e.active);
  if (!e) {
    e = new Enemy();
    pool.push(e);
  }
  e.init(x, y, type);
  return e;
}

export function getActiveEnemies() {
  return pool.filter(e => e.active);
}

export function resetEnemies() {
  pool.length = 0;
}
