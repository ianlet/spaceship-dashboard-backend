'use strict'

const _ = require('lodash')

const findUserStoryAvailabilities = (results) => {
  const userStoryResults = results.reduce((userStory, result) => {
    const userStoryName = _.camelCase(result.userStory)
    const us = userStory[userStoryName] ? userStory[userStoryName] : {}
    const userStoryResults = us.timestamps ? us.timestamps : []
    return {
      ...userStory,
      [userStoryName]: {
        ...us,
        timestamps: [...userStoryResults, result.timestamp],
        points: result.points,
        penalties: result.penalties,
        deaths: result.deaths,
      }
    }
  }, {})
  const availabilities = {}
  Object.keys(userStoryResults).forEach((userStory) => {
    const us = userStoryResults[userStory]
    const availableAt = _.first(us.timestamps.sort())
    availabilities[userStory] = {
      ...us,
      availableAt
    }
  })
  return availabilities
}


module.exports = { findUserStoryAvailabilities }
