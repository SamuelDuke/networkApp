import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Container, Input } from 'reactstrap'

import UserCardList from '../components/userCardList';

import { fetchFriendSearch, friendRequest } from '../actions';

class FriendSearch extends Component {
    componentWillMount() {
        this.props.fetchFriendSearch('');
    }

    render() {
        const friendSearchGet = _.debounce((term) => { this.props.fetchFriendSearch(term)}, 600);

        const containerStyle = {
            marginBottom: '25px'
        };

        const friendRequest = (user) => {
            this.props.friendRequest({friendID: user.userID}, this.props.friendSearch);
        };

        return(
            <div>
                <h2>Search for Friends</h2>
                <Container style={containerStyle}>
                    <Input
                        type="text"
                        onChange={ event => friendSearchGet(event.target.value) }
                    />
                </Container>
                <UserCardList
                    onButtonClick={friendRequest}
                    usersList={this.props.friendSearch}
                    buttonText='Request Friend'
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        friendSearch: state.friendSearch
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ fetchFriendSearch, friendRequest }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FriendSearch);
