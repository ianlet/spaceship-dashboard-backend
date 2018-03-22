'use strict'

const _ = require('lodash')

class UserStory {
  constructor (name, results) {
    this.name = name
    this.results = _.sortBy(results, 'timestamp')
  }

  get points () {
    const lastResult = _.last(this.results)
    return lastResult.points ? lastResult.points : 0
  }

  get penalties () {
    const lastResult = _.last(this.results)
    return lastResult.penalties ? lastResult.penalties : 0
  }

  calculatePoints () {
    return this._hasFailed() ? 0 : this.points
  }

  calculatePenalties () {
    return this._hasRegressed() ? this.penalties : 0
  }

  _hasFailed () {
    const lastResult = _.last(this.results)
    return lastResult.status === 'failed'
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
