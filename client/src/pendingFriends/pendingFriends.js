import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import UserCardList from '../components/userCardList';
import { fetchPendingFriends, pendingAccept } from '../actions';

class PendingFriends extends Component {

    componentWillMount() {
        this.props.fetchPendingFriends();
    }

    render() {
        // const containerStyle = {
        //     marginBottom: '25px'
        // };

        const acceptPending = (user) => {
            this.props.pendingAccept({friendID: user.userID}, this.props.pendingFriends);
        };

        if (!_.isEmpty(this.props.pendingFriends)) {
            return(
                <div>
                    <h2>Pending Friend Requests</h2>
                    <UserCardList
                        onButtonClick={acceptPending}
                        usersList={this.props.pendingFriends}
                        buttonText='Accept Friend'
                    />
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }

    }
}

function mapStateToProps(state) {
    return {
        pendingFriends: state.pendingFriends
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPendingFriends, pendingAccept }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PendingFriends);
