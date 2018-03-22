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
}

module.exports = UserStory
