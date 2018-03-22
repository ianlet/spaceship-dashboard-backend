'use strict'

const _ = require('lodash')
const moment = require('moment')

class UserStory {
  constructor (name, points, penalties, deaths, results, availableAt) {
    this.name = name
    this.results = _.sortBy(results, 'timestamp')
    this.availableAt = availableAt
    this.points = points ? points : 0
    this.penalties = penalties ? penalties : 0
    this.deaths = deaths ? deaths : 0
  }

  get deathCount () {
    return this.deaths
  }

  // get points () {
  //   const lastResult = _.last(this.results)
  //   return lastResult && lastResult.points ? lastResult.points : 0
  // }
  //
  // get penalties () {
  //   const lastResult = _.last(this.results)
  //   return lastResult && lastResult.penalties ? lastResult.penalties : 0
  // }
  //
  // get deathCount () {
  //   const lastResult = _.last(this.results)
  //   return lastResult && lastResult.deaths ? lastResult.deaths : 0
  // }

  calculatePoints () {
    return this._hasFailed() ? 0 : this.points
  }

  calculatePenalties () {
    return this._hasRegressed() ? this.penalties : 0
  }

  calculateDeaths () {
    return this.results
      .filter((result) => result.status === 'failed')
      .reduce((deaths, result) => deaths + this.deaths, 0)
  }

  wasAvailableAt (timestamp) {
    const time = moment(timestamp).add(5, 'minutes')
    return moment(this.availableAt).isSameOrBefore(time)
  }

  _hasFailed () {
    const lastResult = _.last(this.results)
    return !lastResult || lastResult.status === 'failed'
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
