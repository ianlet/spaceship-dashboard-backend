const sinon = require('sinon')

const Progress = require('./progress')
const UserStory = require('./user_story')

const A_TEAM = 'my-super-team'
const FIRST_USER_STORY_POINTS = 5
const SECOND_USER_STORY_POINTS = 7

function givenUserStoryWithPoints (points) {
  const firstUserStory = sinon.createStubInstance(UserStory)
  firstUserStory.calculatePoints.returns(points)
  return firstUserStory
}

describe('Calculate points', () => {
  test('it should add user story points', () => {
    const firstUserStory = givenUserStoryWithPoints(FIRST_USER_STORY_POINTS)
    const secondUserStory = givenUserStoryWithPoints(SECOND_USER_STORY_POINTS)
    const progress = new Progress(A_TEAM, {}, [firstUserStory, secondUserStory])

    expect(progress.calculatePoints()).toBe(FIRST_USER_STORY_POINTS + SECOND_USER_STORY_POINTS)
  })
})
