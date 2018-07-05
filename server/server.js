// npm install --save express body-parser neo4j-driver passport bcrypt-nodejs jsonwebtoken passport-jwt cors lodash

// https://medium.com/@gethylgeorge/using-socket-io-in-react-redux-app-to-handle-real-time-data-c0e734297795

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./apiRouter');
const configMain = require('./config/main');

//ToDo add in multer for uploading photos
//ToDo add in socket.io for chat between friends and matches

const app = express();

// Setup middleware for all Express requests
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// // Setup router
apiRouter(app);

// Start the server
let server = app.listen(configMain.port);
console.log('The server is listening at port ' + configMain.port + ".");