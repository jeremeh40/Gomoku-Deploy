# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In order to start the app, first the server should be started followed by the react application. See below for scripts.

### Server

In the gomoku-server directory you can run:

### `npm start`

Runs the server at [http://localhost:8080] and connects to mongo db.

### Gomoku React app

In the gomoku-react directory, you can run:

### `npm start`

Runs the app at [http://localhost:3000](http://localhost:3000). Click to view it in the browser.

### usage

Pre configured login - please navigate to the login page and use:
username: admin
password: admin

If you would like to create a unique username and password please navigate to the signup page.

1. Ability to login using username:admin password:admin (login page)
2. Size of gameboard can be chosen for logged in users(Home page)
3. alternating turns for black and white (Game page)
4. 5 pieces of the same colour in a row wins(Game page)
5. all spaces used and no winner is a tie(Game page)
6. board can be reset with 'restart' button(Game page)
7. Leave button can be used to navigate to games page once game finished (Game page)
8. Game summary can be viewed on Games page (Games Page)
9. Read only board can be viewed on game-log page with turn order and winner displayed (Game-log page)

### API endpoints

These can be seen and tested at the following Postman collection the json file can also be found in the directory:

### https://api.postman.com/collections/29771685-5a0933f6-5f54-4394-b750-ca01c346dedf?access_key=PMAT-01HB8MWPJ6BRW0D7K73QAMHGAP

Please ensure you first perform the login or signup request. Then you can copy the token from the response and paste it in the authorisation section for each request. Request body is prefilled.

The following API endpoints can be found for this application(all require Token for authorisation):

1. Create game (GET) - User sends boardSize to server and new game object is returned
2. play game (PUT) - User sends Coordinate of piece, turn order, and current player to server, server responds with updated game
3. Get all prior game information (GET) - User sends get request, server responds with all games stored in database
4. Get specific game details and read only gameboard (GET) - User sends gameID, server responds with matching game object
5. Delete unfinished or finished game (Delete) - User sends game Id, Server deletes game from database

# Bonus feature

UI has been overhauled on Game and Game log pages to give a better user experience and to easily visualise changes on the screen and hierarchy, design layout and depth. These changes were mainly completed with CSS.

Delete game function also included when reset button is pressed in order to not save unfinished games to the database.
