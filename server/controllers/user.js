const prepareResponse = require('../config/userHelperFunctions').prepareResponse;

exports.addProfilePhoto = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;

        const query = `
        MATCH (user:Person {userID: '${userID}'})
        SET user.profilePhoto = '${req.body.profilePhoto}'
        RETURN user`;

        // Tests if the relationship already exists
        session.run(query)
            .then(result => {
                session.close();
                //console.log('result', result);
                res.send(prepareResponse(result.records));

            })
            .catch(err => {
                session.close();
                //console.log('err', err);
                res.send(err);
            })

    }
};



