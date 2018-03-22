'use strict'

class Progress {
  constructor (team, stages, userStories) {
    this.team = team
    this.stages = stages
    this.userStories = userStories
    this.points = this.calculatePoints()
    this.penalties = this.calculatePenalties()
    this.deathCount = this.calculateDeathCount()
  }

  calculatePoints () {
    return 0
  }

  calculatePenalties () {
    return 0
  }

  calculateDeathCount () {
    return 0
  }
}

module.exports = Progress
