

exports.setUpDb = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const uniqueEmail = `CREATE CONSTRAINT ON (person:Person) ASSERT person.email IS UNIQUE`;
        //console.log('I am getting sent to the db.', uniqueEmail);

        session.run(uniqueEmail)
            .then(result => {
                session.close();
                return res.send('The unique email constraint is set.', result)})
            .catch(err => {
                session.close();
                return res.send('The unique email constraint was NOT set.');
            });
    }
};

exports.unsetUniqueEmail = (driver) => {
    return (req, res, next) => {
        const session = driver.session();
        const NotUniqueEmail = `DROP CONSTRAINT ON (person:Person) ASSERT person.email IS UNIQUE`;

        session.run(NotUniqueEmail)
            .then(result => {
                res.send('The unique email constraint is removed.', result)})
            .catch(err => {
                    res.send('The unique email constraint was NOT removed.', err);
            })
            .then(()=>{
                session.close()
            })
    }
};