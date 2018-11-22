const R = require('ramda')
const { rlist, rnorm, histogram } = require('randgen')
const { skewASpec } = require('./skewrandom')
const { getSpecs, getVectors, getManOverhead } = require('./myspecs')

const logger = v => {
  console.log(v)
  return v
}
// console.clear()
const myspecs = [[20, 70, 120, 0.1]]

const myvectors = [1]

// 1. correct my specs with my vectors
const correctApoint = avector => R.divide(R.__,avector)
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

// console.log(' -------------------- ')
// 2. run simulation with the corrected specs
// const skewASpec = skewASpec
// const skewSpecs = () => R.map(skewASpec)
// const simulateSpecsSkew = specsxs => R.times(skewSpecs(specsxs))
const skewSpecsXS = (specs, seed) => R.map(skewASpec, specs)
const simulateSkew = specsxs => R.times(R.curry(skewSpecsXS)(specsxs), 100)
// console.log(simulateSkew(myspecs, 3))

// console.log(' -------------------- ')
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
// [[[specresult,sptartar[cresult]]]
const createBars = R.compose(
  R.join(''),
  R.repeat('|'),
  Math.ceil,
  r => r / 30
)
// lets run and analyse
const doestimate = () => {
  const estimate = runSimulation(getSpecs(), getVectors(), 100)

  const diff = (a, b) => a - b
  const sorted = R.sort(diff, estimate)
  const splits = R.compose(
    R.map(R.mean),
    R.splitEvery(sorted.length / 20)
  )(sorted)

  const roundup = n => Math.round(n * 100) / 100
  const addSpace = () => ' '
  const addPadding = R.compose(
    R.join(''),
    R.times(addSpace),
    R.subtract(6),
    R.length,
    R.toString
  )
  const addoverhead = base =>
    R.compose(
      R.add(base),
      R.multiply(base)
    )
  console.clear()
  console.table([
    {
      Mean: Math.round(addoverhead(R.mean(estimate))(getManOverhead())),
      '60%': Math.round( addoverhead(sorted[Math.ceil(sorted.length * 0.6)])(getManOverhead()) ),
      '70%': Math.round(addoverhead(sorted[Math.ceil(sorted.length * 0.7)])(getManOverhead())),
      '80%': Math.round(addoverhead(sorted[Math.ceil(sorted.length * 0.8)])(getManOverhead())),
      '90%': Math.round(addoverhead(sorted[Math.ceil(sorted.length * 0.9)])(getManOverhead()))
    }
  ])
  // console.log(addoverhead(R.mean(estimate))(getManOverhead()))
  // console.log(sorted[Math.ceil(sorted.length * 0.8)])
  const bars = R.map(createBars)
  bars(histogram(estimate, 20))
    .map((line, index) => [line, splits[index]])
    .forEach(([line, localmean], i) => {
      if (i === 16) {
        console.log('80% ------------')
      }
      const withoverhead = addoverhead(localmean)(getManOverhead())
      console.log(
        roundup(withoverhead),
        addPadding(roundup(withoverhead)),
        line
      )
    })
}
doestimate()
// setInterval(doestimate, 250)
