'use strict'

const express = require('express')
const controller = require('./progress.controller')
const router = express.Router()

router.get('/', controller.index)

module.exports = router
