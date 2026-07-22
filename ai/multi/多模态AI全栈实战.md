# 多模态 AI 全栈实战：从零搭建一个 AI 生图应用，学会调云端大模型

> **专栏：** AI 全栈之路  
> **阅读时长：** 10 分钟  
> **关键词：** 多模态 · 通义千问 · Vite · .env · API Key · fetch · async/await

---

## 一、前言：从"调自己的接口"到"调 AI 的接口"

上篇文章我们写了一个 Todo 全栈项目——前端用 `XMLHttpRequest` 调自己的 Node.js 后端，拿到 JSON 渲染到页面。本质上，那就是 **"调 API → 拿数据 → 更新页面"**。

今天我们做一件更刺激的事：**把请求目标从自己的 `/todos` 换成阿里云的通义千问，让它根据你的描述生成一张图片。** 你会发现代码结构几乎一模一样——这就是前端工程师切入 AI 的最佳姿势。

本文的完整项目结构如下：

```
multi/
├── readme.md                   # 核心知识点笔记
└── qwen-image-demo/            # Vite 脚手架生成的工程
    ├── index.html              # 入口：ESM 模块挂载
    ├── package.json            # Vite 8 管理项目
    ├── .gitignore              # 挡住 node_modules 和 .env.local
    └── src/
        └── main.js             # 核心：调通义千问生图 API
```

---

## 二、什么是多模态？

### 2.1 从单模态到多模态

我们之前用的 ChatGPT 是**单模态**——只能处理文本：

```
单模态：输入文字 → 输出文字
  "写一首关于春天的诗" → "春眠不觉晓，处处闻啼鸟..."
```

而**多模态（Multimodal）** 模型可以同时理解和生成**多种类型的数据**——文字、图片、音频、视频：

```
多模态：输入文字 + 图片 → 输出图片
  文字："把这张照片变成梵高风格"
  图片：[一张风景照]
  ↓
  输出：一张梵高笔触的风景画
```

### 2.2 本文用到的能力：图像生成

本文的 demo 展示了更高级的用法——**多图参考 + 文字描述 → 融合生成**：

```
输入：
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ 图1: 女生 │  │图2: 裙子 │  │图3: 姿势 │
  └──────────┘  └──────────┘  └──────────┘
       + 
  文字："图1的女生穿着图2中的黑色裙子按图3的姿势坐下"

输出：一张融合了三张参考图特征的新图片
```

这种"给参考图 + 描述就生成"的能力，在电商换装、设计草图、广告创意等领域已经是**生产力工具**了。

---

## 三、前端工程化：为什么需要 Vite？

### 3.1 回顾之前的做法

在 ajax 和 todos 项目中，我们是这样做的：

```
ajax/frontend/index.html  → 直接双击用浏览器打开
todos/index.html          → 也是直接打开

问题：
1. file:// 协议有各种限制（CORS、模块加载）
2. 改了代码要手动刷新浏览器
3. 写完就完了，没有"构建"的概念
4. 如果要接第三方库，得手动下载或 CDN 引入
```

### 3.2 Vite 是什么？

**Vite**（法语"快"的意思）是下一代前端构建工具，由 Vue.js 作者尤雨溪开发。它解决了以上所有问题：

```bash
# 一行命令创建项目骨架
npm create vite@latest qwen-image-demo

# 进入项目，装依赖，启动
cd qwen-image-demo
npm install
npm run dev          # → http://localhost:5173
```

你的笔记总结得很好：

> VITE 就是前端项目在工程化这块的大管家，npm run dev 后 Vite 接管整个项目。

### 3.3 Vite 给项目带来的变化

| 维度 | 传统方式（ajax/todos） | Vite 工程化（multi） |
|------|----------------------|---------------------|
| 打开方式 | 双击 HTML | `npm run dev` 启动开发服务器 |
| 模块加载 | `<script>` 普通标签 | `<script type="module">` ESM |
| 热更新 | 手动刷新 | 保存文件 → 浏览器自动刷新 |
| 依赖管理 | 手动下载 / CDN | `npm install` 自动管理 |
| 环境变量 | 无 | `.env.local` → `import.meta.env` |
| 生产构建 | 无 | `npm run build` → 压缩优化输出到 `dist/` |

### 3.4 入口文件的变化

```html
<!-- ❌ 传统方式 -->
<script src="./app.js"></script>

<!-- ✅ Vite 项目：type="module" 告诉浏览器这是 ES Module -->
<script type="module" src="/src/main.js"></script>
```

`type="module"` 意味着 `main.js` 里可以用 `import` 和 `export`，浏览器原生支持——不需要 Babel、不需要 Webpack。

---

## 四、核心代码逐行拆解

[src/main.js](qwen-image-demo/src/main.js) 是整个项目的灵魂，一共 58 行。我们把它拆成四段来看。

### 4.1 安全读取 API Key

```js
const apiKey = import.meta.env.VITE_QWEN_API_KEY;
```

这是整个项目**最容易被忽视但最实用的知识点**。

**问题：** 调用 AI 接口需要 API Key（密钥），就像你登录网站需要密码。如果把 Key 直接写在代码里：

```js
// ❌ 危险！绝对不能这样做！
const apiKey = "sk-abc123def456..."
// → git push 之后，全世界都能在你的 GitHub 看到这个 Key
// → 别人可以用你的 Key 疯狂调用 API，产生天价账单
```

**解决方案：** 把 Key 写在 `.env.local` 文件里，代码里用环境变量读取：

```bash
# .env.local（这个文件在 .gitignore 里，不会被提交到 Git）
VITE_QWEN_API_KEY=sk-你的真实密钥
```

```js
// main.js（这个文件可以安全提交到 Git）
const apiKey = import.meta.env.VITE_QWEN_API_KEY;
// Vite 在编译时会把 .env.local 里的值注入进来
```

整个安全流程：

```
┌────────────────────────────────────────────────┐
│  .env.local              .gitignore            │
│  ┌──────────────┐       ┌──────────────┐      │
│  │ 真实 Key     │       │ *.local      │ ← 这行 │
│  │ 存在本地      │       │ 排除 .env.local│     │
│  └──┬───────────┘       └──────────────┘      │
│     │                                           │
│     │ Vite 编译时注入                            │
│     ▼                                           │
│  main.js                                        │
│  const apiKey = import.meta.env.XXX             │
│  （git push 时这里是 import.meta.env.XXX）       │
│  （机器上运行时才是真实 Key）                     │
└────────────────────────────────────────────────┘
```

> ⚠️ **前端环境变量的命名规则：** 必须以 `VITE_` 开头，否则 Vite 不会暴露给客户端代码。这是 Vite 故意的安全设计——防止你把服务器端密钥意外暴露到浏览器。

### 4.2 调用 AI 生图接口

```js
const generateImage = async () => {
  const res = await fetch(
    'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,   // ← HTTP 鉴权
      },
      body: JSON.stringify({
        "model": "qwen-image-2.0-pro",
        "input": {
          "messages": [{
            "role": "user",
            "content": [
              { "image": "https://.../input1.png" },  // 参考图1
              { "image": "https://.../input2.png" },  // 参考图2
              { "image": "https://.../input3.png" },  // 参考图3
              { "text": "图1的女生穿着图2中的黑色裙子按图3的姿势坐下" }
            ]
          }]
        },
        "parameters": {
          "n": 1,               // 生成 1 张
          "size": "1024*1536"   // 竖版海报比例
        }
      })
    }
  )
  const data = await res.json()
  return data.output.choices[0].message.content[0].image
}
```

这段代码和你之前写的 Ajax 请求**结构完全相同**：

```
之前的 /todos 请求：
  fetch('http://localhost:3000/todos')        → GET
  res.json()                                  → 拿 JSON
  todos.map(...).join('')                     → 渲染列表

现在的生图请求：
  fetch('https://dashscope.aliyuncs.com/...') → POST + JSON body
  res.json()                                  → 拿 JSON
  data.output.choices[...].image              → 拿到图片 URL
```

区别只有三点：

| 差异 | ajax/todos | multi |
|------|-----------|-------|
| **请求目标** | `localhost:3000` | `dashscope.aliyuncs.com` |
| **鉴权** | 无 | `Authorization: Bearer xxx` |
| **请求体** | 无（GET） | JSON body（POST） |
| **返回数据** | 数组 `[...]` | 嵌套对象，最深取到图片 URL |

### 4.3 Authorization 鉴权头

```js
headers: {
  'Authorization': `Bearer ${apiKey}`,
}
```

`Authorization: Bearer <token>` 是 HTTP 标准的鉴权方式，几乎所有 AI API 都用这个格式：

| 平台 | 鉴权头格式 |
|------|-----------|
| 阿里云通义千问 | `Authorization: Bearer sk-xxx` |
| OpenAI | `Authorization: Bearer sk-xxx` |
| Anthropic Claude | `x-api-key: sk-ant-xxx` |
| 硅基流动 | `Authorization: Bearer sk-xxx` |

一通百通——学会了调通义千问，调 OpenAI、Claude、Gemini 的姿势完全一样。

### 4.4 请求体的多模态结构

```json
{
  "model": "qwen-image-2.0-pro",
  "input": {
    "messages": [{
      "role": "user",
      "content": [
        { "image": "https://参考图1的URL" },
        { "image": "https://参考图2的URL" },
        { "image": "https://参考图3的URL" },
        { "text": "图1的女生穿着图2中的黑色裙子按图3的姿势坐下" }
      ]
    }]
  }
}
```

注意 `content` 是一个**数组**，里面可以混合 `{"image": "..."}` 和 `{"text": "..."}` ——这就是"多模态"在 API 层面的体现。模型会理解所有输入（图片和文字），然后综合生成结果。

### 4.5 渲染到页面

```js
const renderImage = (imageUrl) => {
  root.innerHTML = `<img src="${imageUrl}" />`
}

const main = async () => {
  const imageUrl = await generateImage()   // 拿到 AI 生成的图片 URL
  renderImage(imageUrl)                     // 插入页面
}
main()
```

API 返回的是一张**图片的临时 URL**（阿里云 OSS），直接 `<img src="...">` 就能显示。整个流程：

```
用户打开页面
  → main() 执行
  → generateImage() 发起 POST 请求
  → 阿里云 GPU 跑模型（需要 10-30 秒）
  → 返回生成的图片 URL
  → renderImage() 把图片插入 #app
  → 用户看到 AI 生成的图片
```

---

## 五、环境搭建：跟着做一遍

### 5.1 申请 API Key

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 开通"模型服务" → 找到"通义千问图像生成"
3. 创建 API Key，复制保存

### 5.2 创建项目并配置

```bash
# 1. 脚手架创建项目
npm create vite@latest qwen-image-demo
# 选择 Vanilla → JavaScript

# 2. 进入项目，装依赖
cd qwen-image-demo
npm install

# 3. 创建环境变量文件
echo 'VITE_QWEN_API_KEY=sk-你的真实密钥' > .env.local

# 4. 启动开发服务器
npm run dev
```

### 5.3 编写代码

把 `src/main.js` 替换为上文的代码，保存后浏览器自动刷新，等待片刻，AI 生成的图片就出来了。

---

## 六、你的 AI 学习路线演进

本文是这个系列的第三篇，三篇文章构成了从前端基础到 AI 应用的完整进阶链：

```
┌─────────────────────────────────────────────────┐
│  第一篇：Ajax 全栈实战                            │
│  XMLHttpRequest + Node.js + CORS + Event Loop    │
│  关键词：理解底层 HTTP 通信                        │
│  调自己的接口：localhost:3000/todos                │
├─────────────────────────────────────────────────┤
│  第二篇：Bun + TypeScript Todo                    │
│  Bun.serve + interface + async/await + RESTful   │
│  关键词：现代工程写法，类型安全                     │
│  调自己的接口：localhost:8080/todos                │
├─────────────────────────────────────────────────┤
│  第三篇：多模态 AI 生图（本文）                     │
│  Vite + 通义千问 + 环境变量 + 多模态 API           │
│  关键词：调 AI 接口，前端工程化                     │
│  调阿里云接口：dashscope.aliyuncs.com              │
└─────────────────────────────────────────────────┘
```

核心认知的跃迁：

```
之前：fetch() 调自己的后端拿 JSON
现在：fetch() 调 AI 云端拿图片

代码写法一模一样！
区别只在于：
  - URL 变了（localhost → 阿里云）
  - 加了 Authorization 头（需要 API Key 鉴权）
  - 返回的 JSON 结构不同（图片 URL 而不是 Todo 数组）
```

---

## 七、总结

这个不到 60 行的项目，涵盖了你从"传统前端"走进"AI 全栈"需要的四个关键知识：

| 知识点 | 要点 |
|--------|------|
| **多模态** | AI 不仅能理解文字，还能同时处理图片、语音、视频——"给图+文字→生图"是典型场景 |
| **Vite 工程化** | `npm create vite` 一键生成项目，开发服务器 + 热更新 + 构建打包 + 环境变量管理 |
| **API Key 安全** | `.env.local` 存密钥 → `.gitignore` 防泄露 → `import.meta.env` 安全读取 |
| **调 AI 接口** | `fetch` + `async/await` + `Authorization` 头 = 和调普通 API 一模一样 |

### 关键对比表

| 维度 | 传统前端 | AI 前端（本文） |
|------|---------|---------------|
| 请求目标 | 自己写的后端 | 云端 AI 服务 |
| 输入 | 无（GET） | 自然语言 + 图片 URL |
| 输出 | 静态数据 | **AI 生成的图片** |
| 鉴权 | 无 | API Key + Bearer Token |
| 工程化 | 直接打开 HTML | Vite 开发服务器 |
| 密钥管理 | 不需要 | `.env.local` + `import.meta.env` |

> **技术的演进从来不只是学新工具——而是认知升维。** 当你意识到 `fetch` 不仅可以调自己的后端，也可以调地球上任何一个 AI 模型时，你就不再只是一个"前端开发"了——你是一个能用 AI 构建任何应用的人。

---

*本文以多模态 AI 生图 Demo 为切入点，从 Vite 工程化脚手架搭建，到 `.env` 环境变量管理密钥安全，再到 `fetch` 调通义千问云端 API 生成图片，手把手带你完成从"调自己接口"到"调 AI 接口"的认知跃迁。*
