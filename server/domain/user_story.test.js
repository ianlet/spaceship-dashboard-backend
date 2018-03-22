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
      deaths: DEATH_COUNT,
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
      deaths: DEATH_COUNT,
      timestamp: '2018-03-22T01:46:05.341Z'
    }
    const succeededUserStory = new UserStory(USER_STORY_NAME, [succeededResult])

    expect(succeededUserStory.calculatePoints()).toBe(POINTS)
  })
})

describe('Count penalties', () => {
  const firstResultSucceeded = {
    status: 'succeeded',
    points: POINTS,
    penalties: PENALTIES,
    deaths: DEATH_COUNT,
    timestamp: '2018-03-22T01:46:05.341Z'
  }
  const secondResultSucceeded = {
    status: 'succeeded',
    points: POINTS,
    penalties: PENALTIES,
    deaths: DEATH_COUNT,
    timestamp: '2018-03-22T01:49:05.341Z'
  }
  const secondResultFailed = {
    status: 'failed',
    points: POINTS,
    penalties: PENALTIES,
    deaths: DEATH_COUNT,
    timestamp: '2018-03-22T01:49:05.341Z'
  }

  test('it should not count penalties given results does not contain a regression', () => {
    const userStory = new UserStory(USER_STORY_NAME, [firstResultSucceeded, secondResultSucceeded])

    expect(userStory.calculatePenalties()).toBe(0)
  })

  test('it should count penalties given results contains a regression', () => {
    const userStory = new UserStory(USER_STORY_NAME, [firstResultSucceeded, secondResultFailed])

    expect(userStory.calculatePenalties()).toBe(PENALTIES)
  })
})
