'use strict'

class ProgressDto {
  constructor (team, stages, userStories, points, penalties, deaths) {
    this.team = team
    this.stages = stages
    this.userStories = userStories
    this.points = points
    this.penalties = penalties
    this.deaths = deaths
  }
}

module.exports = ProgressDto
