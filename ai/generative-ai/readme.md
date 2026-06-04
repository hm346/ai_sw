# Generative AI
英伟达证书


-apikey 
- gitignore + .env
- npm init -y
    初始化node项目 package。json
- npm i openai
    安装openai模块 事实标准 
    - 安装需要花时间 
    - pnpm
        只需要安装一次，在不同的项目中软链接。
    npm install -g pnpm
- .gitignore
    git  提交可以忽略的文件申明
    apikey 不能提交？
    留在本地
    写在.env文件中，.gitignore 中忽略.env 文件

- apikey 读取进来的流程
    dotenv库 读取.env文件
    .env 文件有格式要求
    key(大写)=value 换行
    读取到process对象中
    .env 文件就是环境变量的配置文件
    .gitignore 中忽略.env文件，只在本地跑，远程不提交
    process 全局对象

- mjs 后缀
    js后缀
    modle js
    es6才推出的最新现代化模块化方案
    .js后缀
    package.json 中添加type:"module"

- nodemon
监听文件变化，自动重启进程
npm install -g nodemon
 node index.mjs

## async /await
es8 新增的异步编程语法
js 代码的编写顺序和执行顺序有时候不同、变量声明/异步任务（setTimeout，api请求）
async/await 来卡住执行流程
api 返回结果后继续执行后面的代码

## AIGC 工程化开发流程总结
- AI项目/Agen项目 几乎都是后端项目
- npm init -y 初始化为后端项目
- pnpm i openai/dotenv
- 实例化client
- main 单点入口函数
    - main.mjs 单点入口文件
    - main 单点入口函数


- 调用chat completionapi
同步按顺序进行，很快执行
    - 异步代码 执行慢/等下执行
    耗时长
    控制异步的执行顺序
    async await 让代码可读性更好，控制执行流程

## 课程介绍













