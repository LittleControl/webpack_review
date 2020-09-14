export function mul(...args) {
    return args.reduce((acc, cur) => acc * cur, 1)
}
