import decode from 'jwt-decode';

const initailState = {
    firstName: null,
    lastName: null,
    email: null,
    userID: null,
    profilePhoto: null
};

const getUser = () => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken !== 'undefined' && authToken !== null) {
        return decode(authToken);
    } else {
        return initailState;
    }
};

export default (state = initailState) => {
    const user = getUser();
    const { firstName, lastName, email, userID, exp, profilePhoto } = user;
    // console.log('Here is the user', user);
    return  {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userID: userID,
        exp: exp,
        profilePhoto: profilePhoto
    };
}