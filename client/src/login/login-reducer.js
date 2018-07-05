
const authenticated = () => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken !== 'undefined' && authToken !== null) {
        return (authToken !== 'undefined' && authToken !== null);
    } else {
        return false;
    }
};
const initailState = {
    loggedIn: false
};

export default (state = initailState) => {
    return authenticated();
}