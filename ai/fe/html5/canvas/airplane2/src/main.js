import { Game } from './game.js';

/**
 * 入口：初始化 Canvas，启动游戏
 */
function init() {
  const canvas = document.getElementById('game');
  if (!canvas) return;

  // Canvas 尺寸：适配屏幕
  const maxW = 420;
  const maxH = 750;
  const scale = Math.min(
    window.innerWidth / maxW,
    window.innerHeight / maxH
  );

  canvas.width = maxW;
  canvas.height = maxH;
  canvas.style.width = `${maxW * scale}px`;
  canvas.style.height = `${maxH * scale}px`;

  const game = new Game(canvas);
  game.start();

  // R 键重新开始
  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && game.state === 'gameover') {
      game.restart();
    }
  });

  // 窗口大小变化时重算缩放
  window.addEventListener('resize', () => {
    const s = Math.min(
      window.innerWidth / maxW,
      window.innerHeight / maxH
    );
    canvas.style.width = `${maxW * s}px`;
    canvas.style.height = `${maxH * s}px`;
  });
}

init();
