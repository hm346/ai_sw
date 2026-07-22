import { Player } from './player.js';
import { spawnBullet, getActiveBullets, resetBullets } from './bullet.js';
import { spawnEnemy, getActiveEnemies, resetEnemies, setCanvasSize } from './enemy.js';
import { spawnExplosion, getActiveParticles, resetParticles } from './particle.js';
import { initInput, destroyInput } from './input.js';

/**
 * 游戏主控制器
 */
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.player = null;
    this.score = 0;
    this.lives = 3;
    this.state = 'playing'; // playing | gameover
    this.frame = 0;
    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 50;
    this.stars = [];
    this.animId = null;
  }

  init() {
    initInput();
    setCanvasSize(this.canvas.width, this.canvas.height);
    this.player = new Player(this.canvas);
    this.score = 0;
    this.lives = 3;
    this.state = 'playing';
    this.frame = 0;
    this.enemySpawnTimer = 0;
    this._initStars();
  }

  _initStars() {
    this.stars = [];
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: 0.5 + Math.random() * 2,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random(),
      });
    }
  }

  start() {
    this.init();
    this._loop();
  }

  _loop() {
    this.animId = requestAnimationFrame(() => this._loop());
    this.update();
    this.draw();
  }

  update() {
    if (this.state !== 'playing') return;
    this.frame++;

    // 更新玩家
    this.player.update();

    // 射击
    if (this.player.wantShoot()) {
      spawnBullet(this.player.x, this.player.y - this.player.height / 2);
    }

    // 生成敌机
    this.enemySpawnTimer++;
    if (this.enemySpawnTimer >= this.enemySpawnInterval) {
      this.enemySpawnTimer = 0;
      // 动态难度：随帧数加快生成
      this.enemySpawnInterval = Math.max(20, 50 - Math.floor(this.frame / 600));
      const x = 30 + Math.random() * (this.canvas.width - 60);
      // 偶尔生成中型或大型敌机
      const roll = Math.random();
      const type = roll < 0.1 ? 2 : roll < 0.25 ? 1 : 0;
      spawnEnemy(x, -30, type);
    }

    // 更新子弹
    getActiveBullets().forEach(b => b.update());

    // 更新敌机
    getActiveEnemies().forEach(e => e.update());

    // 更新粒子
    getActiveParticles().forEach(p => p.update());

    // 更新星星背景
    for (const s of this.stars) {
      s.y += s.speed;
      if (s.y > this.canvas.height) {
        s.y = -5;
        s.x = Math.random() * this.canvas.width;
      }
    }

    // 碰撞检测：子弹 vs 敌机
    const bullets = getActiveBullets();
    const enemies = getActiveEnemies();
    for (const b of bullets) {
      if (!b.active) continue;
      for (const e of enemies) {
        if (!e.active) continue;
        if (this._aabb(b, e)) {
          b.active = false;
          e.active = false;
          spawnExplosion(e.x, e.y, e.type === 2 ? 20 : e.type === 1 ? 14 : 10);
          this.score += (e.type + 1) * 10;
        }
      }
    }

    // 碰撞检测：敌机 vs 玩家
    if (this.player.invincible <= 0) {
      for (const e of enemies) {
        if (!e.active) continue;
        if (this._aabb(this.player, e)) {
          e.active = false;
          spawnExplosion(e.x, e.y, 16);
          this.lives--;
          if (this.lives <= 0) {
            this.state = 'gameover';
            spawnExplosion(this.player.x, this.player.y, 30);
          } else {
            this.player.hit();
          }
          break;
        }
      }
    }
  }

  _aabb(a, b) {
    return (
      Math.abs(a.x - b.x) < (a.width + b.width) / 2 &&
      Math.abs(a.y - b.y) < (a.height + b.height) / 2
    );
  }

  draw() {
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;

    // 背景
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, W, H);

    // 星星
    for (const s of this.stars) {
      ctx.fillStyle = `rgba(255,255,255,${0.3 + s.brightness * 0.7})`;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }

    if (this.state === 'playing') {
      // 绘制粒子
      getActiveParticles().forEach(p => p.draw(ctx));

      // 绘制子弹
      getActiveBullets().forEach(b => b.draw(ctx));

      // 绘制敌机
      getActiveEnemies().forEach(e => e.draw(ctx));

      // 绘制玩家
      this.player.draw(ctx);

      // HUD
      this._drawHUD(ctx);
    } else if (this.state === 'gameover') {
      // 绘制残留粒子和敌机
      getActiveParticles().forEach(p => p.draw(ctx));
      getActiveBullets().forEach(b => b.draw(ctx));
      getActiveEnemies().forEach(e => e.draw(ctx));

      // 游戏结束画面
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 20);

      ctx.font = '20px monospace';
      ctx.fillText(`最终得分: ${this.score}`, W / 2, H / 2 + 30);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#aaa';
      ctx.fillText('按 R 键重新开始', W / 2, H / 2 + 70);
    }
  }

  _drawHUD(ctx) {
    const W = this.canvas.width;

    // 半透明顶栏
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, W, 36);

    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`分数: ${this.score}`, 10, 24);

    ctx.textAlign = 'right';
    ctx.fillText(`生命: ${'❤'.repeat(this.lives)}`, W - 10, 24);
  }

  restart() {
    resetBullets();
    resetEnemies();
    resetParticles();
    this.init();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    destroyInput();
    resetBullets();
    resetEnemies();
    resetParticles();
  }
}
