'use strict'

const UserStoryRepository = require('../../persistence/mongo/user_story/user_story.repository')

exports.index = async (req, res) => {
  try {
    const userStories = await UserStoryRepository.find()
    console.log(userStories)
    return res.status(200).json(userStories)
  } catch (_) {
    console.log(_)
    return res.status(200).json([])
  }
}
