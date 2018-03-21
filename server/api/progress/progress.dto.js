'use strict'

class ProgressDto {
    constructor(team, stages, userStories, points, penalties, deathCount) {
        this.team = team
        this.stages = stages
        this.userStories = userStories
        this.points = points
        this.penalties = penalties
        this.deathCount = deathCount
    }
}

module.exports = ProgressDto
