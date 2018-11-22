const R = require('ramda')
const { rnorm } = require('randgen')
const gaussian = require('gaussian')

// console.clear()
// console.log('----------------- skewrandom -----------------')
const getRange = ([min, target, max]) => max - min
const getMean = ([min, target, max]) => min + (max - min) / 2
const getDeviation = spec => (getRange(spec) * 2) * (1 - spec[3])
const getSkew = spec => getMean(spec) - spec[1]
const myspec = [20, 30, 120, 0.68]
const myrandom = 30

const rnormC = R.curry(rnorm)
const getRandom = (spec, iteration) => rnorm(getMean(spec), getDeviation(spec))
// const getRandom = (spec, iteration) => gaussian(getMean(spec), 100).ppf(Math.random())
// const getRandomC = R.curry(getRandom)
// const aresult = getRandomC(myspec)

const distFromMean = (pos, spec) => (pos - getMean(spec)) / (getRange(spec) / 2)
const getWeight = (pos, spec) =>
  1 - Math.abs(Math.tanh(distFromMean(pos, spec)))
const skewedRandom = (spec, random) =>
  random - getSkew(spec) * getWeight(random, spec)

const skewedRandomC = R.curry(skewedRandom)
// const skewASpec = spec => R.ap(skewedRandomC, getRandom)
const skewASpec = spec => skewedRandom(spec, getRandom(spec))
const getaresult = n => {
  const it = n * 10 + 20
  return {
    myrandom: it,
    distFromMean: distFromMean(it, myspec),
    getWeight: R.compose(
      r => r / 100,
      Math.round,
      R.multiply(100)
    )(getWeight(it, myspec)),
    getSkew: getSkew(myspec),
    skewedRandom: R.compose(
      r => r / 100,
      Math.round,
      R.multiply(100)
    )(skewedRandom(myspec, it)),
    diff: R.compose(
      r => r / 1000,
      Math.round,
      R.multiply(1000)
    )(it - skewedRandom(myspec, it))
  }
}
// console.table(R.times(getaresult, 11))
module.exports = { skewASpec }
