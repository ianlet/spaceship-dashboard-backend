const sinon = require('sinon')

const Progress = require('./progress')
const UserStory = require('./user_story')

const A_TEAM = 'my-super-team'
const FIRST_USER_STORY_POINTS = 5
const SECOND_USER_STORY_POINTS = 7
const FIRST_USER_STORY_PENALTIES = 2
const SECOND_USER_STORY_PENALTIES = 3

function givenUserStoryWithPoints (points) {
  const userStory = sinon.createStubInstance(UserStory)
  userStory.calculatePoints.returns(points)
  return userStory
}

function givenUserStoryWithPenalties (penalties) {
  const userStory = sinon.createStubInstance(UserStory)
  userStory.calculatePenalties.returns(penalties)
  return userStory
}

describe('Calculate points', () => {
  test('it should add user story points', () => {
    const firstUserStory = givenUserStoryWithPoints(FIRST_USER_STORY_POINTS)
    const secondUserStory = givenUserStoryWithPoints(SECOND_USER_STORY_POINTS)
    const progress = new Progress(A_TEAM, {}, [firstUserStory, secondUserStory])

    expect(progress.calculatePoints()).toBe(FIRST_USER_STORY_POINTS + SECOND_USER_STORY_POINTS)
  })
})

describe('Calculate penalties', () => {
  test('it should add user story penalties', () => {
    const firstUserStory = givenUserStoryWithPenalties(FIRST_USER_STORY_PENALTIES)
    const secondUserStory = givenUserStoryWithPenalties(SECOND_USER_STORY_PENALTIES)
    const progress = new Progress(A_TEAM, {}, [firstUserStory, secondUserStory])

    expect(progress.calculatePenalties()).toBe(FIRST_USER_STORY_PENALTIES + SECOND_USER_STORY_PENALTIES)
  })
})
