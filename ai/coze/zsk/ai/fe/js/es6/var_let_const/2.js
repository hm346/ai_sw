//全局作用域



{
//代码块
//申明了变量，属于当前块级作用域

const name='zs';
console.log(name)

for(let i=0;i<10;i++){
    //同步代码 尽快执行完
console.log(i);
//异步(延后执行)  i 10
setTimeout(function(){
console.log(`this is ${i}`);



},1000)

}

}