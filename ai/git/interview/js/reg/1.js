let str="13888888889"
//描述一个匹配的规则
//一个字符一个字符的匹配
// let reg=/1[3-9][0-9]{9}/;
let reg=/^1[3-9]\d{9}$/;//对象
console.log(
    Object.prototype.toString.call(reg)
);
console.log(typeof reg);
console.log(reg.test(str));








