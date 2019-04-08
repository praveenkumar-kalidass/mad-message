# mad-message
A Chat application with React.js, Node.js, Postgresql and Socket.io

## Specifications
 - React.js
 - Node.js
 - Socket.io

## Environment setup
### Database configuration
Create a database with the following configuration,
 - Database name: `mad-message`
 - Username: `postgres`
 - Password: `root`

Modify this configuration in `server/database.config.json`.

### Database migration
Execute the following commands to migrate table and initial data load to database,
 - Table migration: `npm run migrate`
 - Load data: `npm run seed`

### Install node modules
Run `npm install` to install `node_modules`.

## Run in development mode
 - Client: `npm run dev`
 - Server: `npm run server`
