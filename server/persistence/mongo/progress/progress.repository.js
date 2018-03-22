'use strict'

const _ = require('lodash')
const VerificationStageEvent = require('./stage_event.model')
const ProgressResult = require('./progress_result.model')
const Progress = require('../../../domain/progress')
const UserStory = require('../../../domain/user_story')

const teamEventReducer = (teamEvents, event) => {
  const stageName = _.camelCase(event.stage)
  const events = teamEvents[event.submission] || {}
  const stages = events[stageName] || []
  return {
    ...teamEvents,
    [event.submission]: {
      ...events,
      [stageName]: [
        ...stages,
        {
          status: _.lowerCase(event.status),
          timestamp: event.timestamp
        }
      ]
    }
  }
}

const teamResultReducer = (teamResults, result) => {
  const userStoryName = _.camelCase(result.userStory)
  const results = teamResults[result.team] || []
  const userStoryResults = results[userStoryName] || []
  return {
    ...teamResults,
    [result.team]: {
      ...results,
      [userStoryName]: [
        ...userStoryResults,
        {
          status: _.lowerCase(result.result),
          points: result.points,
          penalties: result.penalties,
          deaths: result.deaths,
          timestamp: result.timestamp
        }
      ]
    }
  }
}

const find = async () => {
  const events = await VerificationStageEvent.find().exec()
  const teamEvents = events.reduce(teamEventReducer, {})
  const results = await ProgressResult.find().exec()
  const teamResults = results.reduce(teamResultReducer, {})

  return Object.keys(teamEvents).map((team) => {
    const stages = teamEvents[team] ? teamEvents[team] : {}
    const userStoriesResults = teamResults[team] ? teamResults[team] : {}
    const userStories = Object.keys(userStoriesResults).map((userStoryName) => {
      const userStoryResults = userStoriesResults[userStoryName]
      return new UserStory(userStoryName, userStoryResults)
    })
    return new Progress(team, stages, userStories)
  })
}

module.exports = { find: find }
