const sinon = require('sinon')

const Progress = require('./progress')
const UserStory = require('./user_story')

const A_TEAM = 'my-super-team'

describe('Calculate points', () => {
  const FIRST_USER_STORY_POINTS = 5
  const SECOND_USER_STORY_POINTS = 7

  givenUserStoryWithPoints = (points) => {
    const userStory = sinon.createStubInstance(UserStory)
    userStory.calculatePoints.returns(points)
    return userStory
  }

  test('it should add user story points', () => {
    const firstUserStory = givenUserStoryWithPoints(FIRST_USER_STORY_POINTS)
    const secondUserStory = givenUserStoryWithPoints(SECOND_USER_STORY_POINTS)
    const progress = new Progress(A_TEAM, {}, [firstUserStory, secondUserStory])

    expect(progress.calculatePoints()).toBe(FIRST_USER_STORY_POINTS + SECOND_USER_STORY_POINTS)
  })
})

describe('Calculate penalties', () => {
  const FIRST_USER_STORY_PENALTIES = 2
  const SECOND_USER_STORY_PENALTIES = 3

  const givenUserStoryWithPenalties = (penalties) => {
    const userStory = sinon.createStubInstance(UserStory)
    userStory.calculatePenalties.returns(penalties)
    return userStory
  }

  test('it should add user story penalties', () => {
    const firstUserStory = givenUserStoryWithPenalties(FIRST_USER_STORY_PENALTIES)
    const secondUserStory = givenUserStoryWithPenalties(SECOND_USER_STORY_PENALTIES)
    const progress = new Progress(A_TEAM, {}, [firstUserStory, secondUserStory])

    expect(progress.calculatePenalties()).toBe(FIRST_USER_STORY_PENALTIES + SECOND_USER_STORY_PENALTIES)
  })
})

describe('Calculate deaths', () => {
  const FIRST_USER_STORY_DEATHS = 0.25
  const SECOND_USER_STORY_DEATHS = 0.50

  const DEATH_COUNT = 0.125
  const BUILD_TIMESTAMP = '2018-03-22T01:46:05.341Z'
  const TEST_TIMESTAMP = '2018-03-22T01:46:05.341Z'

  const givenUserStoryWithDeaths = (deaths) => {
    const userStory = sinon.createStubInstance(UserStory)
    userStory.calculateDeaths.returns(deaths)
    userStory.wasAvailableAt.returns(false)
    return userStory
  }

  const givenUserStoryWithDeathCountAvailableAt = (deathCount, timestamp) => {
    const userStory = sinon.createStubInstance(UserStory)
    userStory.calculateDeaths.returns(0)
    userStory.wasAvailableAt.withArgs(timestamp).returns(true)
    sinon.stub(userStory, 'deathCount').get(() => deathCount)
    return userStory
  }

  const givenUserStoryWithDeathCountUnavailableAt = (deathCount, timestamp) => {
    const userStory = sinon.createStubInstance(UserStory)
    userStory.calculateDeaths.returns(0)
    userStory.wasAvailableAt.withArgs(timestamp).returns(false)
    sinon.stub(userStory, 'deathCount').get(() => deathCount)
    return userStory
  }

  test('it should add user story deaths', () => {
    const firstUserStory = givenUserStoryWithDeaths(FIRST_USER_STORY_DEATHS)
    const secondUserStory = givenUserStoryWithDeaths(SECOND_USER_STORY_DEATHS)
    const progress = new Progress(A_TEAM, { build: [], test: [] }, [firstUserStory, secondUserStory])

    expect(progress.calculateDeaths()).toBe(FIRST_USER_STORY_DEATHS + SECOND_USER_STORY_DEATHS)
  })

  test('it should add death count given build failed and user story was available at that time', () => {
    const buildFailed = { status: 'failed', timestamp: BUILD_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountAvailableAt(DEATH_COUNT, buildFailed.timestamp)
    const progress = new Progress(A_TEAM, { build: [buildFailed], test: [] }, [userStory])

    expect(progress.calculateDeaths()).toBe(DEATH_COUNT)
  })

  test('it should not add death count given build failed and user story was not available at that time', () => {
    const buildFailed = { status: 'failed', timestamp: BUILD_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountUnavailableAt(DEATH_COUNT, buildFailed.timestamp)
    const progress = new Progress(A_TEAM, { build: [buildFailed], test: [] }, [userStory])

    expect(progress.calculateDeaths()).toBe(0)
  })

  test('it should not add death count given build succeeded', () => {
    const buildSucceeded = { status: 'succeeded', timestamp: BUILD_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountAvailableAt(DEATH_COUNT, buildSucceeded.timestamp)
    const progress = new Progress(A_TEAM, { build: [buildSucceeded], test: [] }, [userStory])

    expect(progress.calculateDeaths()).toBe(0)
  })

  test('it should add death count given test failed and user story was available at that time', () => {
    const testFailed = { status: 'failed', timestamp: TEST_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountAvailableAt(DEATH_COUNT, testFailed.timestamp)
    const progress = new Progress(A_TEAM, { build: [], test: [testFailed] }, [userStory])

    expect(progress.calculateDeaths()).toBe(DEATH_COUNT)
  })

  test('it should not add death count given test failed and user story was not available at that time', () => {
    const testFailed = { status: 'failed', timestamp: TEST_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountUnavailableAt(DEATH_COUNT, testFailed.timestamp)
    const progress = new Progress(A_TEAM, { build: [], test: [testFailed] }, [userStory])

    expect(progress.calculateDeaths()).toBe(0)
  })

  test('it should not add death count given test succeeded', () => {
    const testSucceeded = { status: 'succeeded', timestamp: TEST_TIMESTAMP }
    const userStory = givenUserStoryWithDeathCountAvailableAt(DEATH_COUNT, testSucceeded.timestamp)
    const progress = new Progress(A_TEAM, { build: [], test: [testSucceeded] }, [userStory])

    expect(progress.calculateDeaths()).toBe(0)
  })
})
