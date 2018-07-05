
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUsers, selectFriend } from '../actions';
import FriendSerchBar from '../findFriends/friendSearchBar';

class Users extends Component {
    state = {
        selectedFriend: null
    };

    createUserList() {
        return _.map(this.props.users, (user) => {
            return(
                <li key={user.id}
                    onClick={
                        () => {this.setState({ selectedFriend: this.props.selectFriend(user).payload })}
                    }>
                    <div>Name: {user.firstName} {user.lastName}</div>
                    <button onClick={() => this.props.deleteUser(user.id, this.props.users)}>Add Friend</button>
                </li>)
        });

    }


    componentWillMount() {
        this.props.fetchUsers();
    }

    render() {
        if (!this.props.users) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return (
            <div>
                <form action="submit">
                    <FriendSerchBar />
                </form>
                <ul>
                    {this.createUserList()}
                </ul>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUsers: fetchUsers, selectFriend }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Users);
