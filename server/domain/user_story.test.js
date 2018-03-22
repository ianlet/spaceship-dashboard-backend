const UserStory = require('./user_story')

const USER_STORY_NAME = 'superUserStory'
const POINTS = 5
const PENALTIES = 5
const DEATH_COUNT = 0.5

describe('Count points', () => {
  test('it should not count points given last result failed', () => {
    const failedResult = {
      status: 'failed',
      points: POINTS,
      penalties: PENALTIES,
      deathCount: DEATH_COUNT,
      timestamp: '2018-03-22T01:46:05.341Z'
    }
    const failedUserStory = new UserStory(USER_STORY_NAME, [failedResult])

    expect(failedUserStory.calculatePoints()).toBe(0)
  })

  test('it should count points given last result succeeded', () => {
    const succeededResult = {
      status: 'succeeded',
      points: POINTS,
      penalties: PENALTIES,
      deathCount: DEATH_COUNT,
      timestamp: '2018-03-22T01:46:05.341Z'
    }
    const succeededUserStory = new UserStory(USER_STORY_NAME, [succeededResult])

    expect(succeededUserStory.calculatePoints()).toBe(POINTS)
  })
})
