import { isDown } from './input.js';

/**
 * 玩家战机
 * 方向键移动，边界限制，绘制为几何三角形
 */
export class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 40;
    this.height = 48;
    this.speed = 6;
    this.fireCooldown = 0;
    this.fireRate = 12; // 每N帧发射一颗子弹
    this.invincible = 0; // 无敌帧（受伤后短暂无敌）

    // 初始位置：底部居中
    this.x = canvas.width / 2;
    this.y = canvas.height - 80;
  }

  update() {
    const { canvas, speed } = this;

    if (isDown('ArrowLeft') || isDown('KeyA'))  this.x -= speed;
    if (isDown('ArrowRight') || isDown('KeyD')) this.x += speed;
    if (isDown('ArrowUp') || isDown('KeyW'))    this.y -= speed;
    if (isDown('ArrowDown') || isDown('KeyS'))   this.y += speed;

    // 边界限制
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    if (this.x < halfW) this.x = halfW;
    if (this.x > canvas.width - halfW) this.x = canvas.width - halfW;
    if (this.y < halfH) this.y = halfH;
    if (this.y > canvas.height - halfH) this.y = canvas.height - halfH;

    // 射击冷却
    if (this.fireCooldown > 0) this.fireCooldown--;
    if (this.invincible > 0) this.invincible--;
  }

  wantShoot() {
    if (this.fireCooldown <= 0 && (isDown('Space') || isDown('KeyJ'))) {
      this.fireCooldown = this.fireRate;
      return true;
    }
    return false;
  }

  draw(ctx) {
    // 无敌闪烁效果
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) return;

    const { x, y, width: w, height: h } = this;

    ctx.save();
    ctx.translate(x, y);

    // 引擎火焰
    ctx.fillStyle = '#ff6600';
    ctx.beginPath();
    ctx.moveTo(-8, h / 2);
    ctx.lineTo(0, h / 2 + 10 + Math.random() * 6);
    ctx.lineTo(8, h / 2);
    ctx.fill();

    // 机身
    ctx.fillStyle = '#4dc9f6';
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);          // 机头
    ctx.lineTo(-w / 2, h / 2);      // 左下
    ctx.lineTo(-w / 4, h / 3);      // 左内
    ctx.lineTo(w / 4, h / 3);       // 右内
    ctx.lineTo(w / 2, h / 2);       // 右下
    ctx.closePath();
    ctx.fill();

    // 驾驶舱
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(0, 2, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  hit() {
    this.invincible = 60; // 1秒无敌
  }
}
