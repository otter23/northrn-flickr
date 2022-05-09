# Northrn Flickr

Live Site: https://northrn-flickr.herokuapp.com/

Git Wiki: https://github.com/otter23/northrn-flickr/wiki

## Northrn Flickr at a Glance

Northn Flickr is a full stack application that allows users to browse, add, and comment on bird photos. Users are not required to sign up for an account if they are just browsing and searching for photos. Logged in users can add a photo, update their own photo's title and description, and remove their own photo. A logged in user can also add comments to a photo, and delete their own comments. Share your bird photos with the world and engage with your fellow birding community.

## Application Architecture and Technologies

- Javascript, React.js, Redux, HTML, CSS, Express, PostgreSQL, Sequelize

## Getting Development Environment Up And Running

- Clone this repository (only this branch) to your local machine:
  - `bash git clone https://github.com/otter23/northrn-flickr.git `
- Install Dependencies:
  - run: `npm install` in the root folder
- In /backend folder
  Create a '.env' file based on the 'example.emv' with proper settings for your development environment
  - Create a user in your local postgreSQL database that matches your .env
    - run: `psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`
  - run the following commands in order:
    - `npx dotenv sequelize create:db`
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`
- Start Backend Server:
  - run: `cd backend/`
  - run: `npm start`
- Start Frontend Server:
  - run: `cd frontend/`
  - run: `npm start`

## Challenges

- React race conditions, routing and redirects:

  - App loading the wrong routes before user session or other redux state data is loaded
  - Parent rendering before state updated by child
  - Solved via adding conditionals based on state variables, optional chaining, useEffects to ensure all routes can render without errors
  - adding context would have helped in a couple situations to persist non database data between renders

- ## CSS

  - Working without a framework can be very challenging to get things to behave as intended.
