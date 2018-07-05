module.exports = {
    infoToSend: (user) => {
        return {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePhoto: user.profilePhoto
        }
    },

    prepareResponse: (responseRecords) => {
        const infoToSend = (user) => {
            return {
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePhoto: user.profilePhoto
            }
        };

        let array = [];
        responseRecords.forEach(record => {
            array.push(infoToSend(record._fields[0].properties));
        });
        return array;
    }
};

