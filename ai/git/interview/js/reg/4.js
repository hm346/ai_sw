"hello-world".replace(
  /-(\w)/, 
  (...args)=>{  console.log(args); return ''}
)