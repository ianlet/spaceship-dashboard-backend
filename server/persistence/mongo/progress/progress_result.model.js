'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProgressResultSchema = new Schema({
  team: String,
  userStory: String,
  points: Number,
  penalties: Number,
  deaths: Number,
  result: String,
  timestamp: Date
})

module.exports = mongoose.model('results', ProgressResultSchema)
