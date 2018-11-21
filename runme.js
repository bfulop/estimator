const R = require('ramda')
const gaussian = require('gaussian')
const skewnorm = require('skew-normal-random')

const theresult = () => skewnorm.rvSkewNorm(100, 0, 5, 3, -9, 15)

// const distribution = gaussian(-2, 0.2)
var diff = function(a, b) { return a - b; };
// const getrandom = () => (distribution.ppf(Math.random())
// )
const runSimulation = R.compose(R.sort(diff), theresult)
const result = runSimulation(19)
console.log(R.head(result))
console.log(R.mean(result))
console.log(R.last(result))
console.log(result)
// distribution.pdf(0.3)

