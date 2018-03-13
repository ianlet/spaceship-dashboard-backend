'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProgressResultSchema = new Schema({
    team: String,
    userStory: String,
    result: String,
    timestamp: Date
})

module.exports = mongoose.model('results', ProgressResultSchema)
