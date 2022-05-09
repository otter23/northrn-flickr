/*
//create .gitignore file
//create backend and frontend folders

//BACKEND FOLDER

//Initialize a node module
  ~$ npm init -y


//Install dependencies:
  ~$ npm install bcryptjs cookie-parser cors csurf dotenv express \
  express-async-handler express-validator helmet jsonwebtoken morgan per-env \
  pg@">=8.4.1" sequelize@5 sequelize-cli@5

  ~$ npm install -D dotenv-cli nodemon

//add .env file
  -update file based on .env.example

//generate a JWT strong secret:
  ~$ openssl rand -base64 10
    -a library that should already be installed in your shell
    -create a random string using openssl
  ALT:
  ~$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

//add folder and file config/index.js
  -export an object that packages all the .env variables in a nice object with nice key names

//add .sequelizerc to root
  -tells sequelize where to initialize, and to look in /config/database.js for its db configuration

//add db/ to root

~$ npx sequelize init
  -creates database.js in config/ folder
  -creates  migrations/ models/ seeders/ folders in db/ folder

//create username that matches .env
  -can run psql command from CL
    ~$ psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
  -or can run query in psql directly
    =# CREATE USER <username> WITH PASSWORD '<password>' CREATEDB;

//create the database using sequelize-cli
  ~$ npx dotenv sequelize db:create
    -^'dotenv' tells sequelize to load db config env vars from the .env file


EXPRESS SETUP:
  -create express app.js
    -import numerous packages
  - add numerous middleware to app
  -create routes folder and index.js
    import route and add it to app
  -create folder and file bin/www
    -authenticates database connection
    -then starts express application to listen for server requests on .env port
  -add scripts to package.json
    "scripts": {
      "sequelize": "sequelize",
      "sequelize-cli": "sequelize-cli",
      "start": "per-env",
      "start:development": "nodemon -r dotenv/config ./bin/www",
      "start:production": "node ./bin/www"
    }
    also add sequelize script:
      "clean": "npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"

  -add api route in routes/ import it in routes/index.js
  -add error handlers to app.js (inc sequelize error handlers)
  -add Users Table to sequelize and db (see sequelize below)


SEQUELIZE:

    //add Users table migration and model files
      ~$ npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
    //add database-level constraints to migration file
    //add model-level constraints and validations to model file:
        -use sequelize validator package
        https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
        //If a validation fails, no SQL query will be sent to the database at all.
        //Constraint is defined at SQL level, a constraint error will be thrown by db
        after a sql query and sequelize will forward it to javascript
    //add User model scoping to prevent hashed password from leaving db
        https://sequelize.org/docs/v6/other-topics/scopes/
        -scopes help protect sensitive user information that should not be exposed to other users.
    //add User Model methods for API route interaction with User table into model file
    //migrate table
      ~$ npx dotenv sequelize db:migrate

      //add User table seed file
      ~$ npx sequelize seed:generate --name demo-user
    //update seed file with user record objects
    //seed all
      ~$ npx dotenv sequelize db:seed:all
    //to undo all seed file
      ~$ npx dotenv sequelize db:seed:undo:all

    //check database for correct table creation
      `$ psql <database name> -c 'SELECT * FROM "Users"'

    //repeat above for the following in order
      npx sequelize model:generate --name Image --attributes userId:integer,title:string,description:text,imageUrl:string
      npx sequelize model:generate --name Album --attributes userId:integer,title:string,description:text
      npx sequelize model:generate --name Comment --attributes userId:integer,imageId:integer,comment:text
      npx sequelize model:generate --name JoinImageAlbum --attributes imageId:integer,albumId:integer

      npx sequelize seed:generate --name image-data
      npx sequelize seed:generate --name album-data
      npx sequelize seed:generate --name comment-data
      npx sequelize seed:generate --name imageAlbum-data

    //Associations
      * User hasMany Images  /  Image belongsTo User *

          User.hasMany(models.Image, { foreignKey: "userId" });
          Image.belongsTo(models.User, { foreignKey: "userId" });

      * User hasMany Albums  /  Album belongsTo User *

          User.hasMany(models.Album, { foreignKey: "userId" });
          Album.belongsTo(models.User, { foreignKey: "userId" });

      * User hasMany Comments  /  Comment belongsTo User *

          User.hasMany(models.Comment, { foreignKey: "userId" });
          Comment.belongsTo(models.User, { foreignKey: "userId" });

      * Image hasMany Comments  /  Comment belongsTo Image *

          Image.hasMany(models.Comment, { foreignKey: "imageId" });
          Comment.belongsTo(models.Image, { foreignKey: "imageId" });

      * Album hasMany Images  /  Images hasMany Album *

        const columnMapping = {
              through: "JoinImageAlbum",
              otherKey: "imageId",
              foreignKey: "albumId",
          };

        Album.belongsToMany(models.Image, columnMapping);

        const columnMapping2 = {
              through: "JoinImageAlbum",
              otherKey: "albumId",
              foreignKey: "imageId",
          };

        Image.belongsToMany(models.Album, columnMapping2);


Heroku CLI - Connect to DB
  ~$ heroku pg:psql postgresql-pointy-91357 --app northrn-flickr
  =# \dt - list tables
  =# \d table_name - describe a table
  =# select * from "Table"  to see data

  heroku run npm run sequelize db:migrate
  heroku run npm run sequelize db:seed:all


EXPRESS AUTHENTICATION FLOW:

The backend login flow in this project will be based on the following plan:
  1) The API login route will be hit with a request body holding a valid credential
     (either username or email) and password combination.
  2) The API login handler will look for a User with the input credential in
     either the username or email columns.
  3) Then the hashedPassword for that found User will be compared with the input
     password for a match.
  4) If there is a match, the API login route should send back a JWT in an
     HTTP-only cookie and a response body. The JWT and the body will hold the
     user's id, username, and email.

The backend sign-up flow in this project will be based on the following plan:
  1) The API signup route will be hit with a request body holding a username,
     email, and password.
  2) The API signup handler will create a User with the username, an email, and
     a hashedPassword created from the input password.
  3) If the creation is successful, the API signup route should send back a JWT
     in an HTTP-only cookie and a response body. The JWT and the body will hold
     the user's id, username, and email.

The backend logout flow will be based on the following plan:
  1) The API logout route will be hit with a request.
  2) The API logout handler will remove the JWT cookie set by the login or
     signup API routes and return a JSON success message.

Add User Auth Middlewares:
    -setTokenCookie()
      -sets a JWT cookie after user is logged in or signed up
    -restoreUser()
      -used for routes that require the identity of the current session use
      -"restores" session user based on JWT cookie created at log in/sign up
      -if user is found, adds user to a key on the req obj for later use in the route
      -if no user found, it removes the token cookie from the response
    -checkUserSession()
      -checks if restoreUser actually added a user to req.user
        -if req.user exists, then allows route to move on to next middleware
        -otherwise throws an error not allowing request to continue
    -requireAuth
      -array of 2 middleware
        -restoreUser
        -checkUserSession
      -ensures a session user was added to the request in req.user

Add User Auth Routes:
  -add user.js and session.js to routes/api/ folder
  -add following routes:

    -Login: POST /api/session
      -uses credentials and password to check db for existing user
      -if finds a use, sets token cookie, otherwise sends error

    -Logout: DELETE /api/session
      -sends HTTP request to remove the token cookie from browser
        -sets cookie value to 0 and adds expires=past date to cookie
      -also sends back "success" message

    -Signup: POST /api/users
      -is user successfully created in db, then add a jwt token cookie
      -otherwise passes sequelize validation error to error handler

    -Get session user: GET /api/session
      -returns the current session user as JSON under the key of user, if none exists returns {}

Add User Auth Route Error Request Body Validations:
    -use express-validator package to check form fields are ok before sending sql to db
    -validationResult gathers the results of all the check() middlewares that were run to
    determine which parts of the body (various keys) are valid and invalid.
    -validate log in and sign up request bodies



// FRONTEND FOLDER

create react template
  ~$ npx create-react-app . --template @appacademy/react-v17 --use-npm

Add dependencies:
  ~$ npm install js-cookie react-redux react-router-dom@^5 redux redux-thunk
  ~$ npm install -D redux-logger

Setup Redux Store

ALT with redux pre-added:
  ~$ npx create-react-app . --template @appacademy/react-redux-v17 --use-npm
  npm install js-cookie

add proxy to package.json

setup CSRF for both production and development environments
  - In development, the backend and frontend servers are separate
  - In production, the backend also serves up all the frontend assets, including
    the index.html and any JavaScript files in the frontend/build folder after
    running npm start in the frontend folder.

  -add a XSRF-TOKEN to any fetch requests that aren't HTTP "GET"
    -in production, add a XSRF-TOKEN to the frontend/build/index.html file
    -serve this file at "/" and any non /api routes using express.static middleware
      -attach XSRF-TOKEN cookie to that response
    -in development, need to call fetch to backend route that will send the
     cookie in response before loading application

add state to store to hold session information

Create log in component
  -create thunk action to handle log-in form submission
Create sign up component
  -create thunk action to handle signup form submission
Create log ou component
  -create thunk action to handle logout request


//setup root with package.json to communicate with heroku
    //backend will serve the static frontend build
*/
/*

Challenges:



mainly getting css to work as intended
learned that need to add styling to root, html, body, for react component to fill the page
learned about width % and margin auto for resizing the screen
flex does not affect a text node, need to wrap the text in something
understanding the concept of a build and that all the styling is in one file
-understanding how important class name conventions are and never to use ids for styling since they are too selective

Database setup - went smoothly

PLanning
  -not having a full understanding of flickrs website flow and how to make my own version of their flow
  -after talking things through with a fellow flickr person helped to create a plan first before diving into building out the front end and backend API


Modularity
  -wasn't thinking in components and modular in the beginning
  -had to refactor navigation and footer from a single page to separate components
  -forgot could use if statements to conditionally display to different pages


//IMAGE CRUD

  BACKEND:
    -conflating the frontend url vs backend api routes
    -understanding require auth and making sure to compare the userid to the session user.id

  FRONTEND:
    -Setting up store and thunks
      -only made a shallow copy of state, forgot to deep clone the nested objects and arrays, was a bit tricky but not too bad to figure out

    -Routing:
      -using regex in Route path one \d+ instead of \\d+
      -needed to use exact for nested routes at the app level, otherwise need to route with in the component
      -app loading the wrong route before user session loaded
        -added a clause so app won't render until session is loaded.
    -eager loading db data into redux state on the initial app render helped with any reference errors down the line
    -race conditions between useEffects and whether state has been loaded or not
          -only load app once needed state is loaded.
          -should probably make route specific instead of entire app
    -race conditions
      -redux state not loading before rendering and checking routes
      -part of issue is not having enough stores setup, e.g. a user store
      -also would help to add a fetch one image route
      -easier to query the db then check state

  Error Handling
    -not understanding that fetch does throw network errors automatically and it seems 400 (bad request) and 401 (unauthorized) status codes, but e.g. not 422
    -fetch() function will automatically throw an error for network errors but not for HTTP errors such as 4xx or 5xx responses.
    -For HTTP errors we can check the response.ok property to see if the request failed and reject the promise ourselves by calling return Promise.reject(error); or throwing an error if async

  CSS flex boxes
      -getting css to behave properly with overflow and scrolling and mobile

    -controlled input changed to uncontrolled, must give value prop of input a default value of string value={title ?? ""}

  React - general issues with race conditions and conditionals and isloaded
  most of the time useEffect cansolve these issues and subscribing to the right state
  also adding conditionals pre render


TO DO:
add more seed data
Add proper error handling to Dispatched and submitHandlers where needed
Make sure properly receives error handling that was added to api routes and thunks

add Comment Update feature to imageProfile
Add about page
Add array of cover photo options
Add array of userprofile options
Add set interval for homepage

change app load to be only depended on isLoaded, and then route specific waiting for other slices of redux state
add get one photos api thunk


//SPA where only clicks can navigate
    //represent userId with a UUID
    //each URL is just a reference to something else under the hood
    //this gets parsed under the hood, so people can't just randomly peruse your site
    //that or you don't have urls at all
    //click handler in the img map list and dont user url param, pass down imageUrl form image object as prop

*/
