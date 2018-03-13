'use strict'

module.exports = (app) => {
    app.use('/progress', require('./api/progress'))
}
