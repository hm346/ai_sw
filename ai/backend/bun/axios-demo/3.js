// 如何封装sleep函数

function sleep(t){
    //es6提供的  解决异步问题的api 许下诺言
return new Promise((resolve,reject)=>{
setTimeout(()=>{
resolve();

},t)


})


}







async function main() {
console.log('----s----');
//await 后面接受promise
await sleep(2000)//异步任务同步化
console.log('----e----')

}

main();




































