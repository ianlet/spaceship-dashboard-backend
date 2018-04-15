# CS Games 2018 ULaval - Spaceship Dashboard API

## Dependencies

```
nodejs
yarn
mongo
```


## Running

```sh
yarn install
yarn start
```

## Configuration

You can configure the server with the following environment variables:
```sh
DASHBOARD_API_HOST=0.0.0.0
DASHBOARD_API_PORT=9000
MONGO_HOST=localhost
MONGO_DATABASE=spaceship
```

## Usage

### Get team progresses

#### Request

```
GET /progress
```

#### Response

```json
[
  {
    "team": "team-name",
    "stages": {
      "build": "succeeded",
      "test": "started",
      "trackProgress": "failed"
    },
    "userStories": {
      "sendSuppliesToAResearchTeam": "failed",
      "anotherSuperUserStory": "succeeded"
    },
    "points": 0,
    "penalties": 0,
    "deaths": 0,
    "score": 15,
    "rank": 1
  }
]
```

