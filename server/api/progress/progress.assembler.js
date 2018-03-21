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
    })
}

const toDto = (progress) => {
    const { team, points, penalties, deathCount } = progress
  const stages = progress.stages ? extractLastStatus(progress.stages) : {}
  const userStories = progress.userStories ? extractLastStatus(progress.userStories) : {}
    return new ProgressDto(team, stages, userStories, points, penalties, deathCount)
}

module.exports = { toDto }
