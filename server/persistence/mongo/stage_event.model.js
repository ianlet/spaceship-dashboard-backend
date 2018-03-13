'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VerificationStageEventSchema = new Schema({
    stage: String,
    submission: String,
    status: String,
    timestamp: Date
})

module.exports = mongoose.model('verification_stage_events', VerificationStageEventSchema)
