# 📚 AI 全栈学习路线 —— 基于 Tree 内容逐模块详解

> 跟着这份指南，从 JS 基础到 AI Agent 开发，一步步搞定每一个模块。

---

## 学习地图总览

```
┌──────────────────────────────────────────────────────────┐
│  第1阶段：JS 语言基础（2周）                                │
│    fe/js/type/       → 8种数据类型 + 内存原理               │
│    fe/js/es6/var_let_const/  → 变量提升 + 执行机制          │
│    fe/js/es6/sync_async/     → 同步异步 + Promise + fetch  │
│    fe/js/runway/             → 实战练习                      │
├──────────────────────────────────────────────────────────┤
│  第2阶段：算法数据结构（3周）                               │
│    algorithm/arr/            → 数组 + 遍历方法              │
│    algorithm/stack_queue/    → 栈 + 队列 + 面向对象         │
│    algorithm/tree/           → 二叉树 + 递归 + 四种遍历     │
│    algorithm/list2tree/      → 列表转树（业务必考）          │
│    algorithm/dfs/            → 深度优先搜索                  │
│    algorithm/quick_sort/     → 快排（分治思想）              │
├──────────────────────────────────────────────────────────┤
│  第3阶段：后端 + AI 工程化（3周）                           │
│    backend/bun/              → Bun 运行时 + TypeScript      │
│    generative-ai/            → OpenAI API + async/await     │
│    aigc/http-demo/           → HTTP 前后端分离               │
│    claude code/              → AI 开发环境                   │
├──────────────────────────────────────────────────────────┤
│  第4阶段：前端工程（2周）                                    │
│    fe/html5/3d/              → CSS 布局 + 3D + GPU 加速     │
│    fe/html5/weui-page/       → 移动端适配                    │
│    prompt/landing-page/      → Prompt 工程 + Vite           │
├──────────────────────────────────────────────────────────┤
│  第5阶段：实战项目 + 面试（2周）                             │
│    proj/user-chat/           → AI 全栈项目                   │
│    coze/                     → Agent 开发平台                │
│    git/interview/js/reg/     → 正则 + 笔试                   │
│    fde/                      → 职业定位：FDE                 │
└──────────────────────────────────────────────────────────┘
```

---

# 第1阶段：JS 语言基础

## 1.1 `fe/js/type/` — JS 的 8 种数据类型

### 核心代码逐行解读

**1.js — null 和引用赋值**

```javascript
let a = null;
let b = a;          // 拷贝式赋值：b 拷的是 null 这个值
b = 2;
console.log(a, b);  // null, 2  ← a 不受 b 影响

let obj1 = {name: "谢鲁立"};
let obj2 = obj1;      // 引用式赋值：obj2 拷的是地址！
obj2.company = "快手";
console.log(obj1, obj2); // 两个都变成了 {name: '谢鲁立', company: '快手'}
// 因为 obj1 和 obj2 指向同一个堆内存中的对象

// 释放内存：把引用切断，GC 就会回收
let largeObject = { data: new Array(100000000).fill("hgh") };
largeObject = null; // 切断引用 → 堆里的大对象变成垃圾 → GC 回收
```

**关键理解**：这就是为什么原始类型"拷贝值"，对象"拷贝地址"。内存里的栈和堆的差别就源于此。

**2.js — undefined 的四种出现场景**

```javascript
let a;                   // 场景1：变量声明未赋值 → undefined
let obj = {};
obj.property;            // 场景2：对象不存在的属性 → undefined
function noReturn() {}
noReturn();              // 场景3：函数没有 return → undefined
let arr = [1,2,3];
arr[5];                  // 场景4：访问不存在的数组索引 → undefined
```

**3.js — Number 小数精度 + BigInt**

```javascript
// Number 的坑：二进制存小数不精确
let a = 0.1;
let b = 0.2;
console.log(a + b); // 0.30000000000000004 ← 不是 0.3！

// BigInt：超大整数精确计算
let num1 = 999999999999999999999999999999999999999999999999999999999999999n;
let num2 = 123456789098765433467324577654789008733233456899003466788924243n;
console.log(num1 + num2, typeof num1); // bigint
console.log(num1 + 1n); // ✅ BigInt 只能和 BigInt 运算
// console.log(num1 + 1); // ❌ 报错：不能混合类型
```

**4.js — Symbol 唯一标识符**

```javascript
console.log(Symbol('张志恒') === Symbol('张志恒')); // false ← 永远不相等

let obj = {
    [Symbol()]: 'value',  // Symbol 作为属性名，不会被普通遍历找到
    prop: "2"
};
console.log(Object.keys(obj)); // ['prop'] ← Symbol 属性"隐藏"了
```

> **总结**：7种原始类型（Number/String/Boolean/null/undefined/Symbol/BigInt）← 存栈、拷贝值；1种引用类型（Object）← 存堆、拷贝地址

---

## 1.2 `fe/js/es6/var_let_const/runway/` — 变量提升

**核心概念：JS 代码执行前，var 声明和 function 声明会被"提升"到作用域顶部。**

```javascript
// 你写的代码：
showName();
console.log(myname);
var myname = 'fy';
function showName() {
    console.log('函数执行');
}

// JS 引擎实际看到的：
var myname;                   // ← 变量提升（声明提升，赋值不提升）
function showName() {         // ← 函数提升（整体提升）
    console.log('函数执行');
}
showName();                   // 输出：函数执行
console.log(myname);          // 输出：undefined（提升但未赋值）
myname = 'fy';                // 赋值留在原地
```

**函数 vs var 同名时，函数优先：**

```javascript
console.log(fun);  // 输出：[Function: fun] ← 函数优先于 var
function fun() {}
var fun = 23;      // 这个赋值覆盖了函数
```

---

##

1.3 `fe/js/es6/sync_async/` — 同步异步 + Promise + fetch

### 执行机制：event loop

```javascript
// 1.js — 同步 vs 异步
console.log("start");       // ① 同步，先执行
setTimeout(() => {
    console.log("222");     // ③ 异步，1秒后才执行
}, 1000);
console.log("end");         // ② 同步，接着执行

// 输出：start → end → 222
```

**JS 是单线程**：同步代码先全部跑完，异步任务放到 event loop，等同步代码执行完再取出来执行。

### Promise：控制异步的容器

```javascript
// 3.js
const p = new Promise((resolve, reject) => {
    console.log("许诺言");           // ← executor 同步立即执行
    setTimeout(() => {
        // resolve(666);             // 成功时调用，传给 .then
        reject("网络错误");           // 失败时调用，传给 .catch
    }, 2000);
});

p.then((data) => {
    console.log(data);              // resolve 传过来的值
}).catch((err) => {
    console.log(err);               // reject 传过来的错误
}).finally(() => {
    console.log("finally");         // 无论如何都会执行
});
```

**Promise 三状态**：pending（进行中）→ fulfilled（成功）/ rejected（失败），状态一旦改变不可逆转。

### fetch：HTTP 请求（底层也是 Promise）

```javascript
fetch("https://api.deepseek.com/chat/completions", {
    method: "post",
})
.then((data) => { console.log(data); })
.catch((err) => { console.log(err); });
```

---

# 第2阶段：算法数据结构

## 2.1 `algorithm/arr/` — 数组

### 纯函数 vs 非纯函数

```javascript
let num = 0;
function add(b) {
    num += b;        // 修改了外部变量 → 有副作用 → 非纯函数
    return num;      // 同样的 add(1)，第一次返回1，第二次返回2！
}
```

**纯函数 = 同样输入永远同样输出 + 不修改外部状态**

```javascript
function pureAdd(a, b) { return a + b; } // pureAdd(1,2) 永远返回 3
```

### 数组方法速记

| 方法 | 作用 | 改原数组？ | 返回值 |
|------|------|-----------|--------|
| `push(x)` | 尾部加 | 是 | 新长度 |
| `pop()` | 尾部删 | 是 | 被删的元素 |
| `shift()` | 头部删 | 是 | 被删的元素 |
| `unshift(x)` | 头部加 | 是 | 新长度 |
| `map(fn)` | 映射转换 | **否** | 新数组 |
| `filter(fn)` | 筛选 | **否** | 新数组 |
| `forEach(fn)` | 遍历 | **否** | 无 |
| `splice(i,n,x)` | 删除/插入 | 是 | 被删元素数组 |

### 遍历方法选择

```
需要极致性能    → for 计数循环
需要中途 break  → for...of
需要索引        → forEach
数据转换        → map
数据筛选        → filter
提前判断结果    → every / some
```

### `new Array(7).fill([])` 大坑

```javascript
// ❌ 错误：7行指向同一个数组！
const matrix = new Array(7).fill([]);
matrix[0][0] = 1;
// matrix 的 7 行全部变了！因为 fill 复制的是引用地址。

// ✅ 正确：每行独立
const matrix = Array.from({ length: 7 }, () => []);
```

---

## 2.2 `algorithm/stack_queue/` + `stack_queue2/` — 栈和队列

**构造函数 + prototype 模式（ES6 之前的面向对象写法）：**

```javascript
const MyQueue = function() {
    this.stack1 = [];   // 实例属性
    this.stack2 = [];
};

MyQueue.prototype.push = function() {   // 原型方法，所有实例共享
    console.log('push方法');
};

const queue = new MyQueue();  // new 做了：创建空对象 → 绑定 this → 设置原型
```

**栈**：先进后出（FILO），像一摞盘子
**队列**：先进先出（FIFO），像排队买奶茶

---

## 2.3 `algorithm/tree/` — 二叉树

### 树的 JS 表示

```javascript
function TreeNode(val) {
    this.val = val;
    this.left = null;   // 左子节点引用
    this.right = null;  // 右子节点引用
}

// 一棵树：
//        A
//      /   \
//     B     C
//    / \   / \
//   D   E F   G

const tree = {
    val: 'A',
    left: { val: 'B', left: { val: 'D', left: null, right: null },
                       right: { val: 'E', left: null, right: null } },
    right: { val: 'C', left: { val: 'F', left: null, right: null },
                        right: { val: 'G', left: null, right: null } }
};
```

### 四种遍历（记住"先左后右"不变，变的是根节点位置）

```javascript
// 前序：根 → 左 → 右    结果：A B D E C F G
function preorder(root) {
    if (!root) return;             // 退出条件
    console.log(root.val);         // 先处理根
    preorder(root.left);           // 再处理左子树
    preorder(root.right);          // 再处理右子树
}

// 中序：左 → 根 → 右    结果：D B E A F C G
function inorder(root) {
    if (!root) return;
    preorder(root.left);
    console.log(root.val);         // 根在中间
    preorder(root.right);
}

// 后序：左 → 右 → 根    结果：D E B F G C A
function postorder(root) {
    if (!root) return;
    preorder(root.left);
    preorder(root.right);
    console.log(root.val);         // 根在最后
}

// 层序：一层一层来      结果：A B C D E F G  ← BFS
function levelorder(root) {
    const queue = [];              // 用队列实现
    queue.push(root);
    while (queue.length) {
        const node = queue.shift();  // 出队
        console.log(node.val);
        if (node.left) queue.push(node.left);   // 左孩子入队
        if (node.right) queue.push(node.right); // 右孩子入队
    }
}
```

### 递归思维（爬楼梯 → 斐波那契）

```javascript
// 递归三要素：
// 1. 自顶向下思考（大问题拆小问题）
// 2. 递归公式 f(n) = f(n-1) + f(n-2)
// 3. 退出条件  f(1)=1, f(2)=2

function climbStairs(n) {
    if (n == 1) return 1;    // 退出条件
    if (n == 2) return 2;    // 退出条件
    return climbStairs(n-1) + climbStairs(n-2); // 递归公式
}
// ⚠️ climbStairs(100) 会爆栈！递归太深 → 用迭代或记忆化搜索替代
```

---

## 2.4 `algorithm/list2tree/` — 列表转树（业务高频）

```javascript
const flatList = [
    { id: 1, name: '一级菜单A', parentId: 0 },
    { id: 2, name: '一级菜单B', parentId: 0 },
    { id: 3, name: '二级A-1', parentId: 1 },
    { id: 4, name: '三级A-1-1', parentId: 3 },
    { id: 5, name: '二级B-1', parentId: 2 }
];

function listToTree(list) {
    const map = new Map();     // ES6 HashMap
    const tree = [];

    // 第一遍：建立 id → 节点（带空 children）的映射
    list.forEach(item => {
        map.set(item.id, { ...item, children: [] });
    });

    // 第二遍：把每个节点挂到它的 parent 下
    list.forEach(item => {
        const current = map.get(item.id);
        const parent = map.get(item.parentId);
        if (parent) {
            parent.children.push(current); // 挂到父节点
        } else {
            tree.push(current);            // parentId=0 → 根节点
        }
    });

    return tree;
}
// 时间复杂度 O(n)，两遍遍历搞定
```

---

## 2.5 `algorithm/quick_sort/` — 快排

```javascript
function partition(nums, left, right) {
    let i = left, j = right;
    while (i < j) {
        while (i < j && nums[j] >= nums[left]) j--; // 从右找比基准小的
        while (i < j && nums[i] <= nums[left]) i++; // 从左找比基准大的
        [nums[i], nums[j]] = [nums[j], nums[i]];    // 交换
    }
    [nums[i], nums[left]] = [nums[left], nums[i]];  // 基准归位
    return i;
}

function quickSort(nums, left, right) {
    if (left >= right) return;                         // 退出条件
    let pivot = partition(nums, left, right);          // 分
    quickSort(nums, left, pivot - 1);                  // 治左边
    quickSort(nums, pivot + 1, right);                 // 治右边
}
// 分治思想：选基准 → 小的放左边，大的放右边 → 递归处理左右
```

---

## 2.6 `algorithm/dfs/` — 深度优先搜索

```javascript
function dfs(root, res = []) {
    if (!root) return res;    // 退出条件
    res.push(root.val);       // 处理当前节点
    dfs(root.left, res);      // 递归左子树
    dfs(root.right, res);     // 递归右子树
    return res;
}
// DFS 和树的前序遍历本质上是同一回事
```

---

# 第3阶段：后端 + AI 工程化

## 3.1 `backend/bun/` — Bun + TypeScript

**Bun**：比 Node.js 更快的 JS/TS 运行时 + 包管理器，已被 Anthropic 收购用于 Claude Code 底层。

**TypeScript**：JS 的超集，加了类型约束，已经是 AI Agent 开发的标配。

```bash
# 安装 Bun
powershell -c "irm bun.sh/install/windows | iex"
```

---

## 3.2 `generative-ai/demo1/` — AI 工程化开发流程

### 完整的 AI 项目启动流程：

```bash
npm init -y              # ① 初始化 Node 项目 → 生成 package.json
npm install -g pnpm      # ② 安装 pnpm（软链接，省磁盘）
pnpm i openai dotenv     # ③ 安装依赖
```

### .env 文件 + 读取 API Key：

```env
# .env 文件（不提交到 Git！）
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

```javascript
// index.mjs
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();                        // 读取 .env → process.env
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,  // 从进程环境变量读取
    baseURL: process.env.DEEPSEEK_BASE_URL,
});

const main = async () => {              // async 函数 = 可以用 await
    const result = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'hello' }]
    });
    console.log(result.choices[0].message.content);  // AI 的回复
};
main();
```

**关键概念**：
- `process` 是 Node 的全局对象，代表当前进程
- `process.env` 包含所有环境变量
- `async/await`：让异步代码看起来像同步写法，`await` 会"卡住"等结果返回

---

## 3.3 `aigc/http-demo/` — 前后端分离 + fetch

### BS 架构（Browser / Server）：

```
浏览器 (Browser)                    服务器 (Server)
  main.js                 →→→       http://localhost:3000/friend
  fetch(endpoint)                    ↓
  拿到 JSON 数据         ←←←       返回 [{id:1, name:'Alice', age:20}, ...]
  ↓
  renderData() → 渲染为 <tr> 表格
```

### 实际代码流程：

```javascript
// main.js
async function loadData() {
    const endpoint = 'http://localhost:3000/friend';
    const res = await fetch(endpoint);  // ① 发请求
    const data = await res.json();      // ② 把响应体转为 JSON
    return data;
}

function renderData(friend) {
    const oBody = document.querySelector('table tbody');
    oBody.innerHTML = friend.map(function(friend) {
        return `
            <tr>
                <td>${friend.id}</td>
                <td>${friend.name}</td>
                <td>${friend.age}</td>
            </tr>
        `;
    }).join('');  // 把数组合并为一个大字符串
}

async function init() {
    const friend = await loadData();  // 等数据加载完
    renderData(friend);               // 再渲染
}
init();
```

**核心概念**：
- IP 地址 = 网络层定位服务器
- DNS 解析 = 把域名转成 IP
- 端口号 = 区分同一台服务器上的不同服务
- API endpoint = 请求的 URL 终点

---

## 3.4 `claude code/` — AI 开发环境

```
VS Code + Claude Code 插件 + DeepSeek 配置

最佳实践：
  - 单独窗口打开项目目录
  - 让 Claude Code 有边界感（只读当前项目）
```

---

# 第4阶段：前端工程

## 4.1 `fe/html5/3d/` — CSS 布局基础

- **块级元素**（div、p）：独占一行、可以设置宽高
- **行内元素**（span、a）：不独占一行、不能设置宽高
- `display: inline-block`：不独占一行 + 可以设置宽高
- `display: flex`：弹性布局，开启格式化上下文
- `position: relative` → 相对自身定位
- `position: absolute` → 相对最近的定位祖先
- `vh/vw`：viewport 单位，移动端适配利器

**CSS 3D**：即使 2D 界面也可以手动 3D 化来触发 GPU 加速。

---

## 4.2 `prompt/landing-page/` — Prompt 工程

使用 Vite + React 构建 AI 落地页（food-app），通过 Prompt 驱动页面生成。

---

# 第5阶段：实战项目 + 面试

## 5.1 `proj/user-chat/` — AI 全栈实战

```
proj/user-chat/
├── fe/
│   ├── index.html     ← 结构：Bootstrap 栅格布局 (container → row → col)
│   └── common.js      ← 交互
└── backend/           ← 后端服务

模块化原则：
  - 每个文件夹有职责划分
  - 每个文件只做一件事
  - 好维护 + 好扩展 + 好优化
```

---

## 5.2 `git/interview/js/reg/` — 正则表达式 + 笔试

```javascript
let str = "13888888889";
let reg = /^1[3-9]\d{9}$/;  // 手机号验证：1开头、第二位3-9、后面9位数字
//   ^         → 以...开头
//   $         → 以...结尾
//   [3-9]     → 匹配3到9
//   \d{9}     → 9个数字
//   {n}       → 匹配n次

console.log(reg.test(str));          // true
console.log(typeof reg);             // "object" ← 正则也是对象
console.log(Object.prototype.toString.call(reg)); // "[object RegExp]"

// 实用方法：
str.match(/\d+/g);    // 提取所有数字（g = 全局匹配）
str.replace(/x/, 'y');// 替换
```

---

## 5.3 `fde/` — 终极目标：FDE 前沿部署工程师

> "从卖模型 → 到卖结果"

```
FDE 工作内容：
  ① 理解客户的业务流程
  ② 找出适合 AI 改造的环节
  ③ 连接企业内部数据、系统、工具
  ④ 搭建 Agent、工作流、知识库、评测体系
  ⑤ 确保生产环境稳定运行

工具链：
  豆包 → 大模型产品
  Coze → AI Agent 低代码开发平台
  Trae → AI 编程工具
  剪映 → AI 视频剪辑
```

---

# 🎯 学习建议

| 优先级 | 内容 | 时间 | 方法 |
|--------|------|------|------|
| P0 | JS 数据类型 + 同步异步 | 第1周 | 手敲每个 .js 文件 |
| P0 | 数组 + 树 + 递归 | 第2-3周 | 配合 LeetCode Hot 100 |
| P1 | async/await + fetch + OpenAI API | 第4周 | 跑通 demo1/index.mjs |
| P1 | 前后端分离 HTTP | 第5周 | 跑通 http-demo |
| P2 | 快排 + BFS/DFS + list2tree | 第6周 | 每题 3 遍 |
| P2 | 正则 + 全栈项目 | 第7周 | 手写 + 调试 |
| P3 | Coze + FDE 实践 | 长期 | 做真实项目 |

> **最重要的学习方法**：每个 `.js` 文件都自己手敲一遍，运行看结果，改参数多试几次。看懂了 ≠ 会写了。
