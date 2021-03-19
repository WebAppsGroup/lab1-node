'use strict'

const arr = ['foo', 'trolol', 'yaozi', 'ciao mi chiamo billy', 'p'];

arr.forEach((val, i) => {
    arr[i] = val.length < 2 ? '' : val.substring(0,2) + val.slice(-2);
})

console.log(arr);