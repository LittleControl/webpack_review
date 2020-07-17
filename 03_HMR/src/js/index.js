import '../css/index.css'
import print from './print'

console.log('index.js is loaded!')
function sum(...args) {
    return args.reduce((acc, cur) => acc + cur)
}

print()
sum(1, 2, 3)

if (module.hot) {
    module.hot.accept('./print', () => print())
}
