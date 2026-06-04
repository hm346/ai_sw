
var hi=100;

//局部作用域  global scope
function setWidth(){
    //局部作用于变量
    var width=100;
    console.log(width,hi);
}

setWidth();

var age=100;
if(age>12){
var dog=age*7;
let x=100;
console.log(dog);
dog++;
}
//console.log(dog);  
console.log(x); 


