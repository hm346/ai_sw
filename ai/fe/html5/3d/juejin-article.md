# 手把手教你用纯 CSS 撸一个 3D 旋转立方体，顺便把布局基础全吃透！

## 开篇：CSS 能写 3D？不是在逗我？

当我第一次听说"纯 CSS 写 3D 立方体"的时候，表情是这样的：🤨

但当我自己写完、看到它在浏览器里匀速旋转的那一刻，内心只有一句话——

**CSS 3D 是前端领域最被低估的酷炫技能。**

不需要 Three.js，不需要 WebGL，不需要 Canvas API，几十行 CSS，一个能转的 3D 立方体就出来了。

而且在这个过程中，你会顺便把**行内/块级、flex 布局、inline-block 天坑、绝对定位**这些面试高频基础全部串起来。

准备好了吗？我们开始。

---

## 前置知识：CSS 布局三板斧

在写 3D 之前，先快速过一下 CSS 最基础的几个概念。如果你已经烂熟于心，可以直接跳到 3D 部分。

### 一、HTML 元素的两种"天性"

HTML 元素天生分为两派：

| 类型 | 代表元素 | 能设宽高？ | 独占一行？ |
|------|---------|-----------|-----------|
| **块级（block）** | `div`, `p`, `ul`, `h1` | ✅ 可以 | ✅ 独占 |
| **行内（inline）** | `span`, `a`, `em` | ❌ 不行 | ❌ 不独占 |

```html
<div class="box">我是块级，我占一整行</div>
<span>我是行内，我可以和别的元素挤在一行</span>
```

### 二、display 属性：改天换命

`display` 可以强行改变一个元素的"天性"：

```
display: block          → "我要当块级"
display: inline         → "我要当行内"
display: inline-block   → "我全都要"（能设宽高 + 不独占一行）
display: flex           → "开启弹性布局，管好我的子元素"
display: grid           → "开启网格布局"
```

#### inline-block 的天坑 ⚠️

看这段代码：

```html
<div class="box">1</div>
<div class="box">2</div>
```

```css
.box {
    display: inline-block;
    width: 50%;
}
```

你期待两个盒子各占 50% 并排显示，结果第二个盒子掉到了下一行。为什么？

> **罪魁祸首是 HTML 里两个 div 之间的换行符。** 换行符被渲染成了一个空格，占据了几像素宽度，导致 `50% + 空格 + 50% > 100%`。

**解决方法**：把两个 div 写在同一行：

```html
<div class="box">1</div><div class="box">2</div>
```

面试被问到 inline-block 的坑，这就是标准答案。

### 三、Flex 弹性布局：移动端首选

```css
.box {
    display: flex;
    justify-content: center;  /* 主轴居中 */
    align-items: center;      /* 交叉轴居中 */
}
.item {
    flex: 1;  /* 子元素等分空间 */
}
```

Flex 的强大之处在于**不需要手动算宽度**。四个子元素各写一个 `flex: 1`，自动四等分。移动端视窗大小千变万化，flex 是最可靠的布局方案。

### 四、position 定位

- **`relative`**：相对自己原来的位置偏移。占位还在，别人不会挤过来。
- **`absolute`**：相对最近的"有定位的祖先元素"定位。**脱离文档流**，原来的位置被回收。
- **`fixed`**：相对浏览器窗口定位，滚动也不动。

后面做 3D 立方体时，六个面全是 `absolute`——全部叠在同一个起点，方便我们用 transform 把它们"推"到六个方向。

---

## 正片开始：纯 CSS 3D 旋转立方体

### 第一步：搭建 HTML 骨架

```html
<div class="box-wrap">        <!-- 外层：提供 3D 视距 -->
    <div class="box">         <!-- 中层：3D 舞台 -->
        <div class="face front">前</div>
        <div class="face back">后</div>
        <div class="face left">左</div>
        <div class="face right">右</div>
        <div class="face top">上</div>
        <div class="face bottom">下</div>
    </div>
</div>
```

三层结构，各有分工：

```
box-wrap    →  视距控制（perspective）
  └─ box    →  3D 空间容器（preserve-3d）+ 旋转动画
       └─ face × 6  →  六个面，各自平移+旋转到位
```

### 第二步：基础画布 — 居中 + 尺寸

```css
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100vh;           /* 占满整个视口高度，vh 是 CSS3 新单位 */
    display: flex;           /* flex 布局实现居中 */
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
}
```

`100vh` 这个单位值得多说一句：
- `vh` = viewport height，100vh = 整个屏幕高度
- 移动端适配的利器，不用担心不同手机屏幕高度不一样

### 第三步：3D 核心 — perspective 视距

```css
.box-wrap {
    width: 200px;
    height: 200px;
    perspective: 600px;  /* 🔥 3D 的灵魂 */
}
```

`perspective` 定义了观察者离屏幕的距离：

```
perspective: 200px    →  透视感极强，近大远小非常夸张
perspective: 600px    →  适中，立体感自然
perspective: 2000px   →  透视感弱，接近平面
```

> 🧠 **一句话**：值越小，3D 效果越夸张；值越大，越接近 2D。

### 第四步：3D 舞台 — preserve-3d

```css
.box {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;  /* 🔥 保持子元素的 3D 空间关系 */
    animation: rotate 5s linear infinite;
}
```

`preserve-3d` 是关键——**没有它，所有面的 3D 变换都会被"压扁"成 2D**，立方体瞬间崩塌。

`animation` 定义旋转动画：5 秒一圈，匀速，无限循环。

### 第五步：六个面就位 — transform 的魔法

这是整个 3D 立方体最精妙的一步。六个面初始全叠在同一个位置（`position: absolute`），我们需要用 `transform` 把它们推到立方体的六个面上：

```css
.face {
    width: 200px;
    height: 200px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    opacity: 0.8;
}
```

然后六个面各走各的路：

```css
.front  { transform: translateZ(100px) rotateY(180deg); }
.back   { transform: translateZ(-100px); }
.left   { transform: translateX(-100px) rotateY(-90deg); }
.right  { transform: translateX(100px) rotateY(90deg); }
.top    { transform: translateY(-100px) rotateX(90deg); }
.bottom { transform: translateY(100px) rotateX(-90deg); }
```

#### 为什么是 100px？

面的尺寸是 200×200px，100px 刚好是**一半**。每个面从立方体中心出发，平移半个边长到达表面。

#### 图解：每个面的"路线"

```
                    top
                    ↑ translateY(-100px) 后 rotateX(90°) 翻成水平
                    │
    left  ←────  center  ────→  right
                    │
                    ↓
                  bottom
                    │
                  back（translateZ(-100px) 向后）
```

以 **front（前面）** 为例：

```
1. 初始位置：立方体正中心（和另外五个面叠在一起）
2. translateZ(100px)：沿 Z 轴向前推 100px，到达立方体前表面
3. rotateY(180deg)：绕 Y 轴转 180°，让文字朝外（不然文字朝向立方体内部）
```

#### 一个容易搞混的点

`rotateY` 的旋转方向和直觉可能是反的：

- 绕 Y 轴旋转，相当于**转盘**——顺时针转，面的左侧向外
- 绕 X 轴旋转，相当于**滚筒**——向前翻，面的上部向外

不记得的时候，打开浏览器开发者工具自己调一下方向，比死记硬背快得多。

### 第六步：让立方体转起来

```css
@keyframes rotate {
    0%   { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
}
```

动画加在 `.box`（3D 舞台上），而不是单个面上。整个舞台绕 Y 轴匀速旋转，所有面自然跟着转。

> 改 `rotateY` 为 `rotateX`，立方体就上下翻转；改成 `rotateZ`，就像时钟指针在转。

---

## 最终效果

在浏览器打开页面，你会看到一个边长 200px、半透明、六色立方体，匀速绕 Y 轴旋转：

```
       ┌──────────┐
       │   上(紫)  │
       │          │
┌──────┼──────────┼──────┐
│左(绿)│  前(蓝)  │右(绿)│
│      │          │      │
└──────┼──────────┼──────┘
       │  下(黄)  │
       │          │
       └──────────┘
       后(红)在背面
```

---

## 完整代码

把下面的代码保存为 `.html` 文件，浏览器直接打开就能看到效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS 3D 旋转立方体</title>
    <style>
        * { margin: 0; padding: 0; }

        html, body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #1a1a2e;
        }

        .box-wrap {
            width: 200px;
            height: 200px;
            perspective: 600px;
        }

        .box {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: rotate 5s linear infinite;
        }

        @keyframes rotate {
            0%   { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }

        .face {
            width: 200px;
            height: 200px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: #fff;
            opacity: 0.85;
            border-radius: 8px;
        }

        .front  { background: #4299e1; transform: translateZ(100px) rotateY(180deg); }
        .back   { background: #f5656f; transform: translateZ(-100px); }
        .left   { background: #48bb78; transform: translateX(-100px) rotateY(-90deg); }
        .right  { background: #48bb78; transform: translateX(100px) rotateY(90deg); }
        .top    { background: #9f7aea; transform: translateY(-100px) rotateX(90deg); }
        .bottom { background: #ecc94b; transform: translateY(100px) rotateX(-90deg); }
    </style>
</head>
<body>
    <div class="box-wrap">
        <div class="box">
            <div class="face front">前</div>
            <div class="face back">后</div>
            <div class="face left">左</div>
            <div class="face right">右</div>
            <div class="face top">上</div>
            <div class="face bottom">下</div>
        </div>
    </div>
</body>
</html>
```

---

## 知识全景：一张图串起所有知识点

```
CSS 3D 旋转立方体
│
├── 布局基础
│   ├── 块级 block / 行内 inline
│   ├── display: inline-block（注意换行符天坑！）
│   ├── display: flex（移动端首选布局方案）
│   │   ├── justify-content → 主轴对齐
│   │   └── align-items     → 交叉轴对齐
│   ├── vh/vw 视口单位（移动端适配利器）
│   └── position: relative / absolute
│
├── 3D 核心属性
│   ├── perspective         → 视距，决定 3D 透视强度
│   ├── transform-style: preserve-3d → 保持 3D 空间
│   └── transform
│       ├── translateX/Y/Z  → 平移
│       └── rotateX/Y/Z     → 旋转
│
└── 动画
    └── @keyframes + animation → 定义 + 绑定动画
```

---

## 不止是炫技：CSS 3D 的实际用途

你可能会问："工作中真的会写 3D 立方体吗？"

直接写立方体的场景确实少，但 CSS 3D 的底层能力每天都在用：

| 场景 | 用到的能力 |
|------|-----------|
| **页面卡片翻转效果** | `rotateY(180deg)` + `preserve-3d` |
| **视差滚动** | `translateZ` 制造景深 |
| **流畅动画** | `transform` 触发 GPU 加速，比 `top/left` 动画流畅得多 |
| **Modal 弹窗 3D 效果** | `perspective` + `rotateX` 制造翻转弹出 |
| **移动端优化** | 加 `transform: translateZ(0)` 强制 GPU 渲染，解决卡顿 |

> 哪怕一个纯 2D 页面，加点 `transform: translateZ(0)` 都能让动画更丝滑——因为浏览器会把它交给 GPU 处理。

---

## 练手：三个小挑战

看完文章，建议你动手试试：

1. **改透视**：把 `perspective` 从 600px 改成 200px 和 2000px，看有什么区别
2. **改旋转轴**：把 `rotateY` 改成 `rotateX`，看立方体怎么翻
3. **加内容**：在每个面上放一张图片（`<img>`），做一个旋转的照片立方体

做完了你才算真的"会了"。

---

## 总结

CSS 3D 本质上就三件事：

1. **`perspective`** — 告诉浏览器"观看距离"，制造透视感
2. **`transform-style: preserve-3d`** — 保持子元素在 3D 空间中的位置关系
3. **`transform: translate + rotate`** — 把每个面推到对应的 3D 坐标

搞懂了这三个属性，你就能用 CSS 做出各种 3D 效果——立方体只是起点，旋转木马、3D 相册、立体卡片翻转，全是一个套路。

> 前端的世界从来不止是表单和列表。写几行 CSS，让一个立方体在浏览器里优雅地旋转——这种快乐，大概只有程序员能懂。 🎲

---

*如果这篇文章帮你搞懂了 CSS 3D，欢迎点赞收藏~ 有问题评论区见！*
