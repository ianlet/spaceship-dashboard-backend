'use strict'

const _ = require('lodash')
const moment = require('moment')

class UserStory {
  constructor (name, results, availableAt) {
    this.name = name
    this.results = _.sortBy(results, 'timestamp')
    this.availableAt = availableAt
  }

  get points () {
    const lastResult = _.last(this.results)
    return lastResult.points ? lastResult.points : 0
  }

  get penalties () {
    const lastResult = _.last(this.results)
    return lastResult.penalties ? lastResult.penalties : 0
  }

  get deathCount () {
    const lastResult = _.last(this.results)
    return lastResult.deaths ? lastResult.deaths : 0
  }

  calculatePoints () {
    return this._hasFailed() ? 0 : this.points
  }

  calculatePenalties () {
    return this._hasRegressed() ? this.penalties : 0
  }

  calculateDeaths () {
    return this.results
      .filter((result) => result.status === 'failed')
      .reduce((deaths, result) => deaths + result.deaths, 0)
  }

  wasAvailableAt (timestamp) {
    return moment(this.availableAt).isSameOrBefore(timestamp)
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
