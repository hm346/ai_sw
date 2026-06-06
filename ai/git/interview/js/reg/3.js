
// 将 w换为大写


const str='hello-world';
//（）表示分组 不匹配(),但是可以提取
//$1 表示提取的第一个分组
const reg=/-(\w)/
console.log(str.match(reg));
const res =str.replace(reg,(_,c)=>{
console.log(_,c,'/////');
return c.toUpperCase();

})
console.log(res);