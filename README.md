# Northrn Flickr

Live Site: https://northrn-flickr.herokuapp.com/

Git Wiki: https://github.com/otter23/northrn-flickr/wiki

## Northrn Flickr at a Glance

Northn Flickr is a full stack application that allows users to browse, add, and comment on photos. Users are not required to sign up for an account if they are just browsing and searching for photos. Logged in users can add a photo, create an album of photos, add comments to a photo, and edit/delete their own comments. Currently, Northn Flickr is seeded with xx bird photos from all over the United States.

## Getting Development Environment Up And Running

- Git clone repo to your local machine
- Install Dependencies:
  - run: `npm install` in the root folder
- In /backend folder
  - Create a '.env' file that mirrors the '.env.example' file
  - Create a user in your local postgreSQL database that matches your .env
    -run: `psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`
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

## Application Architecture and Technologies

Frontend: React + Redux + vanilla CSS
Backend: Express + PostgreSQL database

## Challenges and Solutions
