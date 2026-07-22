/**
 * 键盘输入管理
 * 记录当前按下的键，每帧查询
 */
const keys = {};

function onKeyDown(e) {
  keys[e.code] = true;
  // 防止方向键和空格滚动页面
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
    e.preventDefault();
  }
}

function onKeyUp(e) {
  keys[e.code] = false;
}

export function initInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function isDown(code) {
  return !!keys[code];
}

export function destroyInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  Object.keys(keys).forEach(k => delete keys[k]);
}
