'use strict'

class ProgressDto {
  constructor (team, stages, userStories, points, penalties, deaths, score) {
    this.team = team
    this.stages = stages
    this.userStories = userStories
    this.points = points
    this.penalties = penalties
    this.deaths = deaths
    this.score = score
  }
}

module.exports = ProgressDto
