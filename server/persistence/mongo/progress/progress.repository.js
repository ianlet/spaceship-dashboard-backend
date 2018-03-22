'use strict'

const _ = require('lodash')
const VerificationStageEvent = require('./stage_event.model')
const ProgressResult = require('./progress_result.model')
const Progress = require('../../../domain/progress')
const UserStory = require('../../../domain/user_story')
const AvailabilityService = require('../../../domain/availability.service')

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
  const userStoryAvailabilities = AvailabilityService.findUserStoryAvailabilities(results)

  return Object.keys(teamEvents).map((team) => {
    const stages = teamEvents[team] ? teamEvents[team] : {}
    const userStoriesResults = teamResults[team] ? teamResults[team] : {}
    const userStories = Object.keys(userStoryAvailabilities).map((userStoryName) => {
      const points = userStoryAvailabilities[userStoryName].points
      const penalties = userStoryAvailabilities[userStoryName].penalties
      const deaths = userStoryAvailabilities[userStoryName].deaths
      const availableAt = userStoryAvailabilities[userStoryName].availableAt
      const userStoryResults = userStoriesResults[userStoryName] ? userStoriesResults[userStoryName] : []
      return new UserStory(userStoryName, points, penalties, deaths, userStoryResults, availableAt)
    })
    const progress = new Progress(team, stages, userStories)
    return progress
  })
}

module.exports = { find: find }
