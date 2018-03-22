const UserStory = require('./user_story')

const USER_STORY_NAME = 'superUserStory'
const POINTS = 5
const PENALTIES = 5
const DEATH_COUNT = 0.5
const SUCCEEDED_DEATH_COUNT = .25
const FAILED_DEATH_COUNT = .66

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

describe('Count deaths', () => {
  test('it should count deaths every time the user story failed', () => {
    const succeededResult = {
      status: 'succeeded',
      deaths: SUCCEEDED_DEATH_COUNT,
    }
    const failedResult = {
      status: 'failed',
      deaths: FAILED_DEATH_COUNT,
    }
    const userStory = new UserStory(USER_STORY_NAME, [failedResult, succeededResult, failedResult])

    expect(userStory.calculateDeaths()).toBe(failedResult.deaths * 2)
  })
})

describe('Was available at', () => {
  test('it should be available given available date before', () => {
    const AVAILABLE_AT = '2018-03-22T01:49:05.341Z'
    const DATE_AFTER = '2018-03-22T01:49:08.341Z'
    const userStory = new UserStory(USER_STORY_NAME, [], AVAILABLE_AT)

    expect(userStory.wasAvailableAt(DATE_AFTER)).toBe(true)
  })

  test('it should be available given same available date', () => {
    const AVAILABLE_AT = '2018-03-22T01:49:05.341Z'
    const userStory = new UserStory(USER_STORY_NAME, [], AVAILABLE_AT)

    expect(userStory.wasAvailableAt(AVAILABLE_AT)).toBe(true)
  })

  test('it should not be available given available date after', () => {
    const AVAILABLE_AT = '2018-03-22T01:49:05.341Z'
    const DATE_BEFORE = '2018-03-22T01:49:02.341Z'
    const userStory = new UserStory(USER_STORY_NAME, [], AVAILABLE_AT)

    expect(userStory.wasAvailableAt(DATE_BEFORE)).toBe(false)
  })
})
