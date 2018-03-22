'use strict'

class Progress {
  constructor (team, stages, userStories) {
    this.team = team
    this.stages = stages
    this.userStories = userStories
  }

  calculatePoints () {
    return this.userStories.reduce((points, userStory) => points + userStory.calculatePoints(), 0)
  }

  calculatePenalties () {
    return this.userStories.reduce((penalties, userStory) => penalties + userStory.calculatePenalties(), 0)
  }

  calculateDeathCount () {
    return 0
  }
}

module.exports = Progress
