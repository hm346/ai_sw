let friend = [];

async function loadData() {
  // console.log('loadData');
  // endpoint 
  const endpoint = 'http://localhost:3000/friend';

const res=await fetch(endpoint);
const data=await res.json();
return data;
//   await fetch(endpoint) // 发送请求 异步
//     // 等待响应返回
//     // 响应体是json二进制字符串 转换为json对象
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     })

}
function renderData(friend) {
  console.log('renderData');
  const oBody=document.querySelector('table tbody');
  if(friend.length>0){
    oBody.innerHTML=friend.map(function(friend){
        console.log(friend);
        return `
        <tr>
        <td>${friend.id}</td>
        <td>${friend.name}</td>
        <td>${friend.age}</td>
        </tr>
        `
        
    }).join('')
  }
}
async function init() {
  console.log('init start');
  const friend=await loadData();
  console.log(friend)
  renderData(friend);
}
 init();
//console.log('init end')