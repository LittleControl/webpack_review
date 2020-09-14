import '../css/index.css';

function sum(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

// 注册serviceworker

// 需要注意的一点就是eslint不认识window和navigator,需要修改package.json中相关的eslint配置
/*
  env: {
    browser: true
  }
*/

// sw代码必须运行在服务器上 serve -s build

// 解决兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw register successed');
      })
      .catch(() => {
        console.log('sw register failed');
      });
  });
}
