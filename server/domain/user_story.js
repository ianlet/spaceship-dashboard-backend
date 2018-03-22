'use strict'

const _ = require('lodash')

class UserStory {
  constructor (name, results) {
    this.name = name
    this.results = _.sortBy(results, 'timestamp')
  }

  calculatePoints () {
    const lastResult = _.last(this.results)
    const points = (lastResult.status === 'failed') ? 0 : lastResult.points
    return points ? points : 0
  }

  calculatePenalties () {
    const lastResult = _.last(this.results)
    const penalties = lastResult.penalties ? lastResult.penalties : 0
    return this._hasRegressed() ? penalties : 0
  }

  _hasRegressed () {
    let succeeded = false
    let regressed = false
    this.results.forEach((result) => {
      if (result.status === 'succeeded') {
        succeeded = true
      }
      if (result.status === 'failed' && succeeded) {
        regressed = true
      }
    })
    return regressed
  }
}

module.exports = UserStory
