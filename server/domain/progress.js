'use strict'

const _ = require('lodash')

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

  calculateDeaths () {
    const userStoryDeaths = this.userStories.reduce((deaths, userStory) => deaths + userStory.calculateDeaths(), 0)
    const buildDeaths = this._calculateDeathsForStages(this.stages.build)
    const testDeaths = this._calculateDeathsForStages(this.stages.test)
    return userStoryDeaths + buildDeaths + testDeaths
  }

  _calculateDeathsForStages (stages) {
    const failedStages = stages.filter((stage) => stage.status === 'failed')
    const failedUserStories = this._filterAvailableUserStoriesForStages(failedStages)
    return failedUserStories.reduce((deaths, userStory) => deaths + userStory.deathCount, 0)
  }

  _filterAvailableUserStoriesForStages (stages) {
    return _.flatMap(stages, (stage) => {
      return this.userStories.filter((userStory) => userStory.wasAvailableAt(stage.timestamp))
    })
  }
}

module.exports = Progress
