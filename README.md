# profile_signup
Just a simple profile login and signup project using Node, express, mongodb
used bcryptjs to hash the password before its sent to the database
compare password while login and create a session token using JSON WEB Token module

Run mongod and nodemon on terminal
open browser at localhost:3000
sign up and you will be redirected to your profile page where you can save some comments

API routes api/profile, api/comment

To run
npm install 
Create a .env file in the project directory
and create and give value to DB_URL, TOKEN_SECRET and SESSION_SECRET
