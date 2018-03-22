'use strict'

const _ = require('lodash')
const ProgressDto = require('./progress.dto')

const extractLastStatus = (items) => {
  const itemStatuses = Object.keys(items).map((item) => {
    const statuses = items[item]
    const sortedStatuses = _.sortBy(statuses, ['timestamp'])
    const itemStatus = _.last(sortedStatuses)
    return {
      [item]: itemStatus.status
    }
  })
  return itemStatuses.reduce((statuses, itemStatus) => {
    return {
      ...statuses,
      ...itemStatus
    }
  }, {})
}

const userStoriesReducer = (userStories, userStory) => {
  return {
    ...userStories,
    [userStory.name]: userStory.results
  }
}

const toDto = (progress) => {
  const { team } = progress
  const points = progress.calculatePoints()
  const penalties = progress.calculatePenalties()
  const deathCount = progress.calculateDeathCount()
  const stages = extractLastStatus(progress.stages)
  const allUserStories = progress.userStories.reduce(userStoriesReducer, {})
  const userStories = extractLastStatus(allUserStories)
  return new ProgressDto(team, stages, userStories, points, penalties, deathCount)
}

module.exports = { toDto }
