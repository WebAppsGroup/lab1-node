'use strict'

let a=["hamza","yasser","potato","a"];



function fun(a) {
let i=0;
let b=[];
for(i=0;i<a.length;i++)    
{
  if(a[i].length < 2)
  a[i]='';
a[i] = a[i].slice(0,2) + a[i].slice(a[i].length-2,a[i].length)
}

return a;
}

a=fun(a);
console.log(a);