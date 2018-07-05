import axios from 'axios';
import {FETCH_FRIEND_SEARCH, API_URL} from '../actions/constants';

export function fetchFriendSearch(searchTerm) {
    axios.defaults.headers.common['Authorization'] = localStorage.auth_token;
    // ToDo add Search
    const request = axios.get(`${API_URL}/friends/search?searchTerm=${searchTerm}`);
    return {
        type: FETCH_FRIEND_SEARCH,
        payload: request
    }
}


//
// friendSearch (term) {
//     console.log('friendSearch was called');
//     axios.defaults.headers.common['Authorization'] = localStorage.auth_token;
//     return axios.get(`${API_URL}/users?searchTerm=${term}`).then( res => {
//         console.log('res.data', res.data);
//         this.setState({possibleFriends: res.data})
//     });
// }