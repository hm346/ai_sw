// js没用class，约定大写构造函数



function Greeting (name){
    console.log(this);
    this.name=name;


}
Greeting.prototype.say=function(){
console.log(`${this.name}`);
}

Greeting.prototype.work=function(){
console.log(`${this.name}`);
}

const t=new Greeting('张')
t.say();
t.work();

console.log(new Greeting('张'));

