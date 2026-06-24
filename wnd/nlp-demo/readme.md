# Prompt z做NLP任务开发


- 有哪些东西可以模块化
    import from
    export default
    - 维护和可读性
    - 好复用 引入


- 项目模块化搭建
     - main.mjs 单点入口（鉴权、路由）
     - client.mjs  cient.mjs对象
     - completion.mjs 完成任务的函数


## es6 是javas在2015年推出的新版本，变化比较大，目标是让js 大型项目企业级开发语言

- let cconst 声明提升bug，支持块级作用域
    let const 不能重复声明，const 简单数据类型不能重新赋值，复杂数据类型可以重新赋值，但不可以改变其指向的内存地址(类型)

- ... rest运算符/ spraed 展开运算符
- 解构赋值
    - 对象
    - 数组 简洁且性能好

- 模块化 esm 模块
    - import from
    - export default
    - export

## nlp 任务
- 情感分类 
    正面|负面|中性
    电商等行业中非常重要 客服服务、预警、产品质检等
    后台
<!-- async function  main() {
    const lamp_review_zh='我需要一盏漂亮的卧室灯，这款灯具有额外的储物功能，价格也不算太高。\
  我很快就收到了它。在运输过程中，我们的灯绳断了，但是公司很乐意寄送了一个新的。\
  几天后就收到了。这款灯很容易组装。我发现少了一个零件，于是联系了他们的客服，他们很快就给我寄来了缺失的零件！\
  在我看来，Lumina 是一家非常关心顾客和产品的优秀公司！';

//few shot
const prompt=`
识别以下用三个反引号分隔的产品评论的作者表达的情感。
包含不超过5个项目。
将答案格式化为以逗号分隔的单词列表。
评论文本：\`\`\`${lamp_review_zh}\`\`\`
`
    const response=await getCompletion(prompt);
    console.log(response);
    
}
main(); -->

<!-- - 信息提取 infor extraction
 const prompt=`
// 从评论文本识别以下项目：
// - 情绪(正面或负面)
// - 是否表达了愤怒？（是或否）
// - 评论者购买的商品
// - 制造物品的公司

// 评论用三个反引号分隔。
// 将您的响应格式化为json对象，以“sentiment”、"anger"、“product”、
// "brand"为键
// 如果信息不存在，请使用**未知**作为值。
// 让你的回复尽可能简短
// 将anger 值格式化为布尔值
// 评论文本：\`\`\`${lamp_review_zh} \`\`\`\`

// `
评论文本：\`\`\`${lamp_review_zh}\`\`\`
`
    const response=await getCompletion(prompt);
    console.log(response);
    
}
main(); -->



- 主题推断

- 文本总结 summarization
    老板、行政岗、小编 需要对长文本进行总结，提取出信息

    
仅用几分钟，我们就可以构造多个用于对文本进行**推理**的系统，而以前需要熟练的机器学习人员数天到数周的时间
让我们兴奋，可以使用prompt构建nlp系统























