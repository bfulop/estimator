const R = require('ramda')
const { rlist, rnorm, histogram } = require('randgen')
const { skewASpec } = require('./skewrandom')

console.clear()
const myspecs = [[20, 30, 120, 0.6], [20, 30, 120, 0.9], [2, 5, 8, 0.9]]

const myvectors = [0.3, 0.6, 0.7, 2]

// 1. correct my specs with my vectors
// ([a] -> [a]) -> [[a]]
const correctApoint = avector => R.multiply(avector)
const correctAspec = avector =>
  R.compose(
    R.over(R.lensIndex(2), correctApoint(avector)),
    R.over(R.lensIndex(1), correctApoint(avector)),
    R.over(R.lensIndex(0), correctApoint(avector))
  )
const correctSpecs = (specs, vectors, seed) =>
  R.map(correctAspec(rlist(vectors)), specs)
const simulateCorrections = (specs, vectors, times) =>
  R.times(R.curry(correctSpecs)(specs, vectors), times)
// console.log(simulateCorrections(myspecs, myvectors, 2))

console.log(' -------------------- ')
// 2. run simulation with the corrected specs
// ([[a]] -> [a]) -> [a]
// const skewASpec = skewASpec
// const skewSpecs = () => R.map(skewASpec)
// const simulateSpecsSkew = specsxs => R.times(skewSpecs(specsxs))
const skewSpecsXS = (specs, seed) => R.map(skewASpec, specs)
const simulateSkew = specsxs => R.times(R.curry(skewSpecsXS)(specsxs), 100)
// console.log(simulateSkew(myspecs, 3))

console.log(' -------------------- ')
// 3. pipe the calculations
const runSimulation = R.pipe(
  simulateCorrections,
  R.map(simulateSkew),
  R.unnest,
  R.map(R.sum)
)

// we have
// [[simulatecorrections,simulatecorrection]]
// [[[simulateskew,simulateskew,simulateskew]]]
// [[[specresult,specresult]]]

// lets run and analyse
const estimate = runSimulation(myspecs, myvectors, 100)
// console.log(estimate)

console.log(R.mean(estimate))
console.log(histogram(estimate))

