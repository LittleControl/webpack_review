// import { mul } from './utils'

/* 
  通过js代码,让某个文件被单独打包成一个chunk
*/

import(/* webpackChunkName: 'utils' */'./utils')
  .then((result) => {
    // eslint-disable-next-line
    console.log(result)
  })
  .catch(() => {
    //eslint-disable-next-line
    console.log('File loader failed!')
  })

function sum(...args) {
  return args.reduce((acc, cur) => acc + cur, 0)
}

// eslint-disable-next-line
// console.log(mul(1, 2, 3))
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4))
