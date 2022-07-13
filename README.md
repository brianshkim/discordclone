# Ioniq(discord clone)
## Technologies Used:
* Javascript
* Python
* REACT
* HTML5
* REDUX
* Flask
* Socket.io
* PostgreSQL

***
Ioniq demo: https://ioniq-app.herokuapp.com/

Github wiki: https://github.com/brianshkim/discordclone/wiki
***
## Developer:
Brian


***
## About
This project is based off of [Discord](https://discord.com).


***

## How to Run
1. Download the [repository]((https://github.com/brianshkim/discordclone)) and open it in VS Code.
2. Install the necessary dependencies by running `npm install` in the terminal.
3. Create an `.env` file in the root of the project. Input the corresponding information from the `.env.example` file.
4. Create your local database called ionic_db.
    * Create a user named `ionic` with db privileges with the password "password".
    * Initialize pipenv with pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt.
    * Then run the following:
        * `pipenv shell`
        * `flask db upgrade`
        * `flask seed all`
        * `flask run`
5. Start the local server in your terminal by running npm install to install dependencies and `npm start` to start the local server on another terminals in your folder called react-app.
6. Navigate to `http://localhost:3000/` in Google Chrome.

***

## Languages and Frameworks
* [React.js](https://reactjs.org/docs/getting-started.html): a free and open-source front-end JavaScript library for building user interfaces based on UI components
* [React-Redux](https://react-redux.js.org/): an open-source JavaScript library for managing and centralizing application state. 
* [Flask](https://flask.palletsprojects.com/en/2.1.x/): Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. 
* [PostgreSQL](https://www.postgresql.org/): the primary data store or data warehouse for many web, mobile, geospatial, and analytics applications.
* [SQLAlchemy](https://www.sqlalchemy.org/): SQLAlchemy is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL.

***

## Future Features
* Friends
* Save user messages
* Server User List


***



### Website Screenshots

<img width="957" alt="Screenshot 2022-07-10 144307" src="https://user-images.githubusercontent.com/28768561/178629757-16e1ed16-7e93-4e1a-a3ef-901f225585f8.png">
<img width="788" alt="channel" src="https://user-images.githubusercontent.com/28768561/178629762-3a336499-4ee0-4252-ac0d-d4f7f3fa7049.png">

