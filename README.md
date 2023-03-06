# Hackernews collection app

This is a small example backend for integration with Hackernews.com. It allows users to create and manage "collections", in which they may enter stories. When they do, a snapshot of the story with all its comments is saved asynchronously into an SQL database.

User may access stories in collections, but they can not modify, move, nor delete them (but the implementation would look the same as it does for collection CRUD.) - this was outside of the scope of the task.

# Installation

Make sure you have [yarn](https://yarnpkg.com/), [docker](https://www.docker.com/) and [node](https://nodejs.org/en/) installed. Then in this directory run
```sh
# Install dependencies
yarn
# Run database
# If you prefer, you can run postgres manually instead
docker compose up
# Copy .env
cp .env.example .env
# Fill in any missing secrets (any string will do for demonstration)
vi .env
# Run migrations
yarn migrate
```

# Running
After installing, you can run with
```sh
yarn dev
```
and use a tool like Postman to test the application.

## Unit tests
Unit tests are scoped to the endpoints only - there is no testing of hackernews API, nor of database integration. Both of these are mocked out.

To run the tests, execute
```sh
yarn test
```