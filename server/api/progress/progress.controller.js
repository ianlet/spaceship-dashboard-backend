'use strict'

const _ = require('lodash')
const ProgressRepository = require('../../persistence/mongo/progress/progress.repository')
const ProgressAssembler = require('./progress.assembler')

exports.index = async (req, res) => {
  try {
    const progresses = await ProgressRepository.find()
    const rankedProgresses = _.sortBy(progresses, 'score')
    const progressDtos = rankedProgresses.map(ProgressAssembler.toDto)
    progressDtos.forEach((progressDto, i) => progressDto.rank = i + 1)
    return res.status(200).json(progressDtos)
  } catch (_) {
    return res.status(200).json([])
  }
}
