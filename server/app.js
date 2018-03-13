'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/environment')

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options)

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
})

const app = express()
const server = require('http').createServer(app)
require('./config/express')(app)
require('./routes')(app)

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

exports = module.exports = app
