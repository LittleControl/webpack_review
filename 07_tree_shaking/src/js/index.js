import '../css/index.css';

function sum(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
