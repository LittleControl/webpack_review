import '../css/index.css';
import { print } from './print';

console.log('index module is loaded!');
print();
console.log('Problem after me');
console.log('problem')();

if (module.hot) {
  module.hot.accept('./print', () => print());
}
