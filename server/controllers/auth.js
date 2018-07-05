const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const infoToSend = require('../config/userHelperFunctions').infoToSend;

const configMain = require('../config/main');

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const generateToken = (user) => {
    return jwt.sign(user, configMain.jwtSecret, {
        expiresIn: configMain.jwtExpiration // in seconds
    });
};


exports.registerUser = (driver) => {
    const session = driver.session();

    return (req, res, next) => {
        const email = req.body.email.toLowerCase();
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = generateHash(req.body.password);
        const hashedEmail = crypto.createHash('md5').update(email).digest('hex');
        // const verifyPassword = req.body.verifyPassword;

        const query = `CREATE (person:Person{
            firstName: '${firstName}',
            lastName: '${lastName}',
            password: '${password}',
            email: '${email}',
            userID: '${hashedEmail}'
        }) RETURN person`;

        session.run(query).then(result => {
            session.close();
            return res.send(result.records[0]._fields[0].properties);
        }).catch(err => {
            session.close();
            return res.send(err);
        })
    }
};

exports.loginUser = (driver) => {
    const session = driver.session();
    return (req, res, next) => {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const query = `MATCH (person:Person) WHERE person.email = '${email}' RETURN ID(person), person;`;

        session.run(query).then(result => {
            let user  = result.records[0]._fields[1].properties;
            user.id = user.userID;
            // user.id = result.records[0]._fields[0].low;
            // console.log('login User', user);

            if (bcrypt.compareSync(password, user.password)) {
                const token = 'Bearer ' + generateToken(infoToSend(user));
                return res.status(200).json({status: 'success', token: token});
            } else {
                res.send('Email and password did not match.')
            }
        }).catch(err => {
            res.send(err);
        }).then(()=> {session.close()})
    }
};