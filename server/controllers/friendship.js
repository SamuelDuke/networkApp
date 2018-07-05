const infoToSend = require('../config/userHelperFunctions').infoToSend;
const prepareResponse = require('../config/userHelperFunctions').prepareResponse;

const isFriendsWith = 'IS_FRIENDS_WITH';

exports.requestFriendship = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;
        const friendID = req.body.friendID;
        if (userID === friendID) {
            return res.send('You can not be your own friend');
        }

        const testIfFriendshipNotExists = `RETURN NOT EXISTS( (:Person {userID: '${userID}'})-[:${isFriendsWith}]-(:Person {userID: '${friendID}'}))`;

        const isFriendsWithQuery = `
        MATCH (user:Person), (friend:Person) 
        WHERE user.userID = '${userID}' AND friend.userID = '${friendID}'
        MERGE (user)-[friendship:${isFriendsWith} {accepted: false}]->(friend)
        RETURN type(friendship)`;

        // Tests if the relationship already exists
        session.run(testIfFriendshipNotExists)
            .then(testResult => {
                if (testResult.records[0]._fields[0]) {
                    // If the relationship does not exist it will create it.
                    session.run(isFriendsWithQuery)
                        .then(result => {
                            session.close();
                            return res.status(200).send(result)})
                        .catch(err => {
                            session.close();
                            return res.status(500).send(err);
                        });
                } else {
                    session.close();
                    return res.send('That relationship already exists!');
                }
            })
    }
};

exports.getFriendRequests = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;
        const query = `
        MATCH (user:Person {userID: '${userID}'})<-
        [f:IS_FRIENDS_WITH {accepted: false}]
        -(friends:Person ) 
        RETURN friends;
        `;
        session.run(query)
            .then(result => {
                session.close();
                res.send(prepareResponse(result.records));
            })
            .catch(err => {
                session.close();
                res.send(err);
            })
    }
};

exports.acceptFriendship = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;
        const friendID = req.body.friendID;

        const query = `
        MATCH 
        (user:Person {userID: '${userID}'})
        <-[friendship:IS_FRIENDS_WITH {accepted: false}]- 
        (friend:Person {userID: '${friendID}'}) 
        SET friendship.accepted = true RETURN friendship`;

        session.run(query)
            .then(result => {
                const value = result;
                session.close();
                //console.log('Result',value);cd
                return res.send(value);
            })

    }
};

exports.getFriendships = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;
        //
        const query = `
        MATCH (user:Person {userID: '${userID}'})-
        [f:IS_FRIENDS_WITH {accepted: true}]
        -(friends:Person) 
        RETURN friends;
        `;

        session.run(query)
            .then(result => {
                session.close();
                res.send(prepareResponse(result.records));
            })
            .catch(err => {
                session.close();
                res.send(err);
            })
    }
};



exports.getNonFriends = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;
        let friendsList = [];

        const friendsQuery = `
        MATCH (user:Person {userID: '${userID}'})-
        [:IS_FRIENDS_WITH]
        -(friends:Person)
        RETURN friends.userID;`;

        session.run(friendsQuery)
            .then(friends => {
                friendsList.push(`'${userID}'`);
                friends.records.forEach(friend => {
                    friendsList.push(`'${friend._fields[0]}'`)
                });
            })
            .then(() => {
                const allUsersQuery = `
                        MATCH (users:Person) 
                        WHERE NOT users.userID 
                        IN [${friendsList}] 
                      
                        RETURN users;`;

                session.run(allUsersQuery)
                    .then(result => {
                        session.close();
                        res.send(prepareResponse(result.records));
                })
            })
            .catch(err => {
                session.close();
                console.log('err', err);
                res.send(err);
            })
    }
};

exports.search = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const userID = req.user.userID;

        let friendshipList = [];

        const queryString = req.query.searchTerm;

        const friendshipQuery = `
            MATCH (users:Person)-[:IS_FRIENDS_WITH]-(user:Person {userID: '${userID}'}) 
            RETURN users.userID`;


        session.run(friendshipQuery)
            .then(friendships => {
                friendshipList.push(`'${userID}'`);
                friendships.records.forEach(friendship => {
                    friendshipList.push(`'${friendship._fields[0]}'`);
                });
            })
            .then(() => {
                const query = `
                    MATCH (users:Person) 
                    WHERE NOT (users.userID IN [${friendshipList}])
                    AND (users.firstName =~ '(?i).*${queryString}.*' 
                    OR users.lastName =~ '(?i).*${queryString}.*') 
                    RETURN users;
                `;
                session.run(query)
                    .then(result => {
                        session.close();
                        // result.records.forEach(record => {console.log(record._fields[0].properties)});

                        return res.send(prepareResponse(result.records));
                    });
            })
            .catch(err => {
                session.close();
                console.log('err', err);
                return res.send(err);
            });
    }
};


exports.template = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const query = `
        
        `;
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




