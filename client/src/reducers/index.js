import { reducer as form } from 'redux-form';
import user from '../profile/profile-reducer';
import loggedIn from'../login/login-reducer';
import users from '../users/users-reducer';
import pendingFriends from '../pendingFriends/pendingFriends-reducer';
import friendSearch from '../friendSearch/friendSearch-reducer';
import friends from '../friends/friends-reducer';

export {
    form,
    user,
    loggedIn,
    users,
    pendingFriends,
    friendSearch,
    friends
}