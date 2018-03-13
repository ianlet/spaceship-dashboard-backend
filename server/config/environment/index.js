'use strict'

const path = require('path')
const _ = require('lodash')

module.exports = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.DASHBOARD_API_PORT || 9000,
    ip: process.env.DASHBOARD_API_HOST || '0.0.0.0',
    secrets: {
        session: 'spaceship-dashboard-backend-secret'
    },
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: `mongodb://${process.env.MONGO_HOST || 'localhost'}/${process.env.MONGO_DATABASE || 'spaceship'}`
    }
}
