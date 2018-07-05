const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const configMain = require('./main');
// const User = require('../data_models/user');

module.exports = (app, driver) => {


    const jwtOptions = {
        // Telling Passport to check authorization headers for JWT
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Telling Passport where to find the secret
        secretOrKey: configMain.jwtSecret
    };


    // Setting up JWT login strategy
    passport.use(new JwtStrategy(jwtOptions, function(payload, done, next) {

        const session = driver.session();

        session.run(`MATCH (user:Person) WHERE user.userID = '${payload.userID}' RETURN user`)
            // .then(user => {})


    //     User.findById(payload.id).exec()
            .then(user => {
                const newUser = user.records[0]._fields[0].properties;

                if (user) { done(null, newUser) }
                else { done(null, false) }
            })
            .then(null, err => { return done(err, false) });
    }));

    app.use(passport.initialize());
};