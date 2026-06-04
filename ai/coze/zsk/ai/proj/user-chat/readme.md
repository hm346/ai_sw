# users chat AI 全栈项目

-后端+前端目录创建
    目录->全栈项目->协作形式（前后端分离 古法编程）->模块化

## 模块化 module
-一个函数只做一个功能
-一个文件只写一个类/模块
-一个文件夹只负责一个模块。架构

### 优势
-好维护
-高质量
-   可读性、简单可靠

## js
前端、后端、ai、嵌入式。。。。。。



## users 项目需求

-后端 
    users相关的数据接口 API 

-js node 后端初始化
    npm init -y
    package.json  项目描述文件
    npm node packageemne management
node包管理器
npm i json-server


## 数据存储
-数组、对象、内存中的数据容器
-长期存储
    数据库 mysql
    json文件 JavaScript object notation {key：val...}
    excel csv 文本 pdf....

### restful  数据模式 暴露资源
web 开发的根基   阿里巴巴java代码规范
设计url的范式
 协议：//  域名：端口   某台服务器的某个服务 资源 
https：//localhost：3000/users
https：//localhost：3000/books
https：//localhost：3000/posts
https：//localhost：3000/posts/：id  某篇文章

-http的动作
    CRUD
    GET Read  https：//localhost：3000/posts/：id 
    POST Create https：//localhost：3000/posts
    PUT/PATCH Update
    DELETE Delete


## 前端
-前端三剑客 模块化
html  网页结构
css 样式
js 行为

### html
-盒子
    块级的能力 宽高
    pc端的业务 固定的宽度 左右留白
    containner 设备 电脑尺寸
-语义化标签
div.container（盒子）>nav+main+nav
不要div满天飞  nav/main拒绝用div
语义化的标签 除了盒子功能外，自带语义
-可读性更好 有利于维护
-搜索引擎优化 SED 爬虫看的  百度/谷歌 爬虫 爬取网页 分析DOM结构 

-DOM 模型
Document Object Model
    -Document
    html document 文本
    text/plain
    html标签 a img h1 http 传输的超文本传输协议一种文本格式
    text/html
    <!DOCTYPE html>
    ！  html5 版本的标记
-DOM树
html是根节点
    body可视区的开始节点
    header
    .container
        nav
        main
        nav
    footer

-Object model?
html 在浏览器（html parser c++）的树状结构，在内存中建立了全局的document对象
通过document对象我们可以操作html，动态改变页面
DOM编程
document.querySelector 树的查找、
id很快 唯一 索引
.table次之
标签最慢


-内容
    行内


    

## propmt
-加上模块化的约束
-请你帮我设计users用户数据接口，请遵守restful机制
-请帮我编写首页，使用bootstrap css 框架，使用语义化标签。






