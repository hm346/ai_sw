# 需要掌握的数据结构

## 列表
- 数组 
很多语言内置的数据结构 （开箱即用）
- 链表
- 栈
- 队列
- 树
  二叉树

## 怎么学习和复习数据结构
面向JavaScript 
面向面试 
hot 100 

- 需要注意的问题
不要急于做题，要迁移语言

## 数组
开箱即用， JS更灵活
没有强调每一项类型一样
也不需要限制length 
- 内存
起始地址 + 偏移量

## 数组的创建

- ADT 的认识
  连续的存储空间 + 特定的操作
- push，pop，shift，unshift
  - 修改原数组 破坏了原来的数组，这些方法都不是纯函数
  - push：返回结果是新长度
  - pop：移除的最后一个元素的值
  - shift：在队头出队元素，返回出队的值
  - unshift：在队头插入的元素的值
- 纯函数
- new Array(7)
指定了长度的空数组
[empty x 7] 初始化为空
empty 数组的这个位置还没有被占据，不属于任何类型
arr[0] undefined
- (new Array(7)).fill(1)
创建一个长度确定，同时每一个元素也确定的值的数组

## 数组的访问和遍历
arr[0]  // 索引，下标 

## 遍历的方法
- for 计数循环
  机器化，命令式，缺点是可读性不好
  优点是性能最好
- for of 
  语义很好
- forEach
  入调用栈 执行上下文...
  优点是功能强大
  缺点是不能中途break
- map、filter、every、some
  基于forEach
  返回一个全新数组 纯函数
  filter 筛选 函数结果为true 留下
  every 每一项满足结果 true
  some 有一项满足结果 true


怎么选择？

## 二维数组
矩阵  llm   向量矩阵

(new Array(7)).fill([])
这里fill的[] 是引用类型，fill 传的是入参的引用
本质是同一个数组



<!-- 一、需要掌握的数据结构
数组 (Array)：几乎所有语言都内置了数组，直接 [1, 2, 3] 就能用，所以叫"开箱即用"。数组在内存里是一块连续的存储空间。

链表 (Linked List)：每个节点除了存数据，还存一个指向下一个节点的指针。数组插入删除是 O(n)，链表是 O(1)，但链表不能像数组那样 arr[3] 直接跳到第 3 个元素。

栈 (Stack)：只能从一端操作的"受限数组"。FILO（先进后出），就像一摞盘子——最后放上去的最先拿走。

队列 (Queue)：只能一头进、另一头出的"受限数组"。FIFO（先进先出），就像排队买奶茶。

树 (Tree)：二叉树是面试最常考的——每个节点最多两个子节点，左孩子右孩子。

二、怎么学习和复习数据结构
"面向 JavaScript" — 不用为了学算法先去学 C 语言。JS 本身就是图灵完备的语言，LeetCode 支持 JS，直接用它刷就行。

"面向面试" — LeetCode Hot 100 是性价比最高的题单，100 道题覆盖了数组、链表、栈、队列、树这些最高频考点。

"不要急于做题，要迁移语言" — 很多教材用 C/Java 写，你要学会把思路翻译成 JS，而不是硬用 C 语法写 JS。

三、数组的特性
JS 的数组和 C/Java 的数组最大的不同是没有严格限制：


// C/Java 数组：所有元素必须同类型，长度固定
// JS 数组：完全不限制
const arr = [1, 'hello', {a: 1}, [2, 3], true];  // 合法 ✅
arr[999] = '随便加';  // 合法 ✅，不需要预分配
内存模型：起始地址 + 偏移量
不管什么语言，数组在内存底层都一样——一块连续的空间：


内存地址:  0x1000    0x1008    0x1010    0x1018
           ┌────────┬────────┬────────┬────────┐
           │ arr[0] │ arr[1] │ arr[2] │ arr[3] │
           └────────┴────────┴────────┴────────┘
访问 arr[3]，计算机做的事情是：起始地址 + 3 × 每个元素的大小，一步到位，所以数组的随机访问是 O(1)。

V8 引擎的优化策略：如果数组里全是整数，V8 用紧凑的内存布局；如果类型混杂，V8 退化成哈希表（变慢了）。

四、数组的创建
4.1 ADT（抽象数据类型）
数组的 ADT = 一段连续的存储空间 + 一组特定的操作方法

理解 ADT 的关键：数据是怎样存储的（连续空间） × 你只能通过这些方法操作它（push/pop/索引等）。这就是数据结构的核心思维。

4.2 push / pop / shift / unshift
这四个方法直接修改原数组（不是纯函数）：

方法	作用	返回值
push(x)	尾部加一个	新数组的长度
pop()	尾部删一个	被删除的元素
shift()	头部删一个	被删除的元素
unshift(x)	头部加一个	新数组的长度

const arr = [1, 2, 3];

arr.push(4);      // arr = [1,2,3,4], 返回 4
arr.pop();        // arr = [1,2,3],   返回 4 (被删的)
arr.unshift(0);   // arr = [0,1,2,3], 返回 4
arr.shift();      // arr = [1,2,3],   返回 0 (被删的)
4.3 纯函数
同样的输入，永远得到同样的输出，不产生任何副作用（不修改外部状态）


// ❌ 非纯函数：依赖并修改了外部变量 num
let num = 0;
function add(b) {
  num += b;      // 副作用：改了外部变量
  return num;    // 同样的输入 b=1，第一次返回1，第二次返回2 —— 不一样！
}

// ✅ 纯函数
function pureAdd(a, b) {
  return a + b;  // pureAdd(1,2) 永远返回 3
}
push/pop/shift/unshift 修改了原数组，所以不是纯函数。map/filter/concat/slice 不修改原数组，返回新数组，所以是纯函数。

4.4 new Array(7) 和 empty 陷阱

const arr = new Array(7);
console.log(arr);        // [ <7 empty items> ]
console.log(arr[0]);     // undefined
console.log(0 in arr);   // false ← 关键！这个位置根本不存在
empty ≠ undefined。empty 表示这个内存槽位还没有被任何东西占据。访问空槽返回 undefined 只是 JS 的一种"兜底"行为。

这会影响 map、forEach 的行为：


const arr1 = new Array(3);      // [empty × 3]
const arr2 = [undefined, undefined, undefined];

arr1.map((_, i) => i);  // [empty × 3]  ← map跳过了空槽！
arr2.map((_, i) => i);  // [0, 1, 2]    ← 正常执行
forEach、map、filter 等遍历方法会跳过 empty slot，因为它在数组里根本就不"存在"。

4.5 fill()：填满数组

const arr = new Array(7).fill(1);  // [1, 1, 1, 1, 1, 1, 1]
fill(n) 把每个槽位都填上 n，这样数组每个位置都"真的存在"了，遍历方法就能正常工作。

五、数组的遍历方法
5.1 for 计数循环

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
性能最好——底层直接就是机器指令，没有函数调用
缺点是"命令式"，变量 i 本身没语义，可读性差
5.2 for...of

for (const item of arr) {
  console.log(item);
}
读起来自然："对于数组里的每一项"
可以 break 中断
缺点：拿不到索引
5.3 forEach

arr.forEach((item, index, self) => {
  console.log(item, index, self);
});
功能最全：同时拿到元素、索引、数组本身三个参数
每个元素都要进入调用栈执行一次回调函数，有额外开销
不能 break——因为它的本质是把回调函数传给引擎，引擎在内部循环调用。你的 return 只是从这一次回调里返回，下一次照样执行。
5.4 map、filter、every、some
这四个都是纯函数——不修改原数组：


const arr = [1, 2, 3, 4, 5];

arr.map(x => x * 2);        // [2, 4, 6, 8, 10]  每个元素都映射为新值
arr.filter(x => x > 2);     // [3, 4, 5]          只保留回调返回 true 的元素
arr.every(x => x > 0);      // true               是否每一项都满足？
arr.some(x => x > 4);       // true               是否至少有一项满足？
5.5 怎么选择？
场景	用哪个
追求极致性能（比赛）	for
需要中途 break	for...of
需要索引	forEach
数据转换	map
数据筛选	filter
提前判断结果	every / some
六、二维数组和 fill 的大坑
6.1 问题出在哪

const matrix = new Array(7).fill([]);  // 看似创建了7行空数组

matrix[0][0] = 1;
console.log(matrix);
// [
//   [1],
//   [1],  ← 我只改了第0行，为什么所有行都变了？？
//   [1],
//   ...
// ]
6.2 原因
[] 是一个引用类型（对象）。fill([]) 不是把 [] 的内容复制 7 份，而是把 [] 的内存地址复制了 7 份：


matrix[0] ──┐
matrix[1] ──┤
matrix[2] ──┼──→ 同一个 [] 对象 ← 7个指针指向同一块内存
matrix[3] ──┤
matrix[4] ──┤
matrix[5] ──┤
matrix[6] ──┘
所以 matrix[0][0] = 1 改的是唯一的那一个数组，所有 7 个行指针都指向它，看起来就"全变了"。

6.3 正确写法

// 循环创建，每次都是全新的 []
const matrix = new Array(7);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = [];
}

// 或者用 Array.from（推荐）
const matrix = Array.from({ length: 7 }, () => []);
总结一下核心概念：

概念	一句话解释
ADT	数据的存储方式 + 操作方式的抽象描述
纯函数	同样输入永远同样输出，不碰外部状态
empty vs undefined	empty 是"不存在"，undefined 是"存在但值未定义"
引用类型	变量存的不是值本身，而是内存地址
fill 陷阱	fill 复制的是引用，不是值 -->
