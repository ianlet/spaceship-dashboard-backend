'use strict'

module.exports = (app) => {
    app.use('/progress', require('./api/progress'))
    app.use('/user-story', require('./api/user_story'))
}
