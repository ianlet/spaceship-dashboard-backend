'use strict'

const express = require('express')
const controller = require('./user_story.controller')
const router = express.Router()

router.get('/', controller.index)

module.exports = router
