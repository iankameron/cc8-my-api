This was created during my time as a student at Code Chrysalis

# bowling-api

Personal API project

## Purpose

This repo provides the following to set up a RESTful API that can be used to create/access/edit bowling related data.

- Server: express server
- DB: POSTGRES
- Testing: chai-http

## Getting started (for production DB)

- Yarn
- Create 'bowling' database
- yarn migrateprod
- yarn seedprod (if you want to seed data)
- (Optional) yarn seedprod (if you want to seed data)

### (for development and testing)

- Create 'bowldev' database
- yarn migratedev - to initialise
- yarn test

## Endpoints

- /centers - Bowling Center data
- /members - Member data
- /games - Game data (HOPEFULLY COMING SOON)
- /league - League data (HOPEFULLY COMING SOON)

Documentation available in ./public/index.html
