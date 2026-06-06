let template = `我是{{name}}, 年龄{{age}}， 性别{{sex}}`;
let person = {
  name: '赖庆庆',
  age: 17,
  sex: '男'
}
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/ // {} 长度
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name])//date[name]中name={{name}}中的name
  return render(template,data);
}
  return template;
}
console.log(render(template, person));


// let template = `我是{{name}}, 年龄{{age}}, 性别{{sex}}`;
// let person = { name: '赖庆庆', age: 17, sex: '男' };

// function render(template, data) {
//   const reg = /\{\{(\w+)\}\}/g; // ✅ 加上 g 标志：全局匹配

//   return template.replace(reg, (match, name) => {
//     return data[name] !== undefined ? data[name] : match; // ✅ 安全替换：存在则替换，不存在保留原占位符
//   });
// }



