// eslint-disable-next-line
console.log('index.js is loaded')

import '../css/index.css'

let btn1 = document.querySelector('#btn1')
btn1.addEventListener('click', () => {
    //懒加载, 文件用的到的时候才会加载
    // import(/* webpackChunkName: 'test' */'./test')
    //     .then(data => {
    //         console.log(data)
    //         console.log(data.getName('Nothing', 'GoGOGO'))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    // webpackPrefetch: true 预加载
    //其他资源加载完毕,空闲时才会加载,兼容性就差,对移动端不友好
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
        .then(data => {
            console.log(data)
            console.log(data.getName('Nothing', 'GoGOGO'))
        })
        .catch(err => {
            console.log(err)
        })
})

