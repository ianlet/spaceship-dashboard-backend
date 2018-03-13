'use strict'

const ProgressRepository = require('../../persistence/mongo/progress_repository')
const ProgressAssembler = require('./progress.assembler')


exports.index = async (req, res) => {
    try {
        const progresses = await ProgressRepository.find()
        const progressDtos = progresses.map(ProgressAssembler.toDto)
        return res.status(200).json(progressDtos)
    } catch (_) {
        return res.status(200).json([])
    }
}
