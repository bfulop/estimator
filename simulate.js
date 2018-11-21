const R = require('ramda')
const gaussian = require('gaussian')
const skewnorm = require('skew-normal-random')
const { rlist } = require('randgen')

const vectors = [0.2, 0.5, 3, 0.8, 1, 2, 0.9, 0.3]
const getVector = () => rlist(vectors)

// [min,real,max,confidence]
const estimates = [[2, 4, 8, 0.2], [3, 5, 10, 0.9], [4, 7, 12, 0.5]]

// 1. correct the estimates
const runVectorcorrect = v =>
  R.compose(
    R.adjust(0, R.multiply(v)),
    R.adjust(1, R.multiply(v)),
    R.adjust(2, R.multiply(v))
  )

const correctEstimates = runVectorcorrect(getVector())
correctEstimates(estimates[0])
R.map(correctEstimates, estimates)
