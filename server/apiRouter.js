const express = require('express');
const neo4j = require('neo4j-driver').v1;
const passport = require('passport');
const configMain = require('./config/main');
const passportStrategy = require('./config/passport');

//ToDo add facebook, linkedIn, and google strategies to passport
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const driver = neo4j.driver(configMain.database, neo4j.auth.basic(configMain.databaseUser, configMain.databasePassword));

    // connect to passport auth
    passportStrategy(app, driver);

    //Routes
    const dbSetupRoutes = express.Router();
    const authRoutes = express.Router();

    const apiRoutes = express.Router();
    const friendRoutes = express.Router();
    // const userRoutes = express.Router();

    //Controllers
    const AuthController = require('./controllers/auth');
    const DbSetupController = require('./controllers/dbSetup');
    // const UserController = require('./controllers/user');
    const FriendController = require('./controllers/friendship');

    // Auth Routes
    // Requires [email, password] returns JWT
    authRoutes.post('/login', AuthController.loginUser(driver));

    //Requires [firstName, lastName, email, password] returns user
    authRoutes.post('/register', AuthController.registerUser(driver));

    app.use('/auth', authRoutes);

    // DbSetup Routes
    // Makes it so one node per email address
    dbSetupRoutes.post('/setupDb', DbSetupController.setUpDb(driver));

    app.use('/dbSetup', dbSetupRoutes);

    // //User Routes

    //ToDo add a way to add profile photo
    // userRoutes.put('/profilePhoto', UserController.addProfilePhoto(driver));

    //ToDo add user wants and user skills
    // Connect to apiRoutes
    // apiRoutes.use('/users', userRoutes);

    // Friend Routes
    // Requests a friendship Requires [body.friendID]
    friendRoutes.post('/', FriendController.requestFriendship(driver));

    // Accepts a friend request Requires [body.friendID]
    friendRoutes.put('/accept', FriendController.acceptFriendship(driver));

    //Gets all accepted friendships
    friendRoutes.get('/', FriendController.getFriendships(driver));

    //gets all pending requests
    friendRoutes.get('/friendRequests', FriendController.getFriendRequests(driver));

    //Returns all users that are currently do not and relationship with the user Requires [query.searchTerm]
    friendRoutes.get('/search', FriendController.search(driver));

    // Connect to apiRoutes
    apiRoutes.use('/friends', friendRoutes);

    // Connect api to app and require auth for all api calls
    app.use('/api', requireAuth, apiRoutes);
};