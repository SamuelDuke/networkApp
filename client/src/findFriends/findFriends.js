import React, { Component } from 'react';

import PendingFriends from '../pendingFriends/pendingFriends';
import FriendSearch from '../friendSearch/friendSeach';

import { Container, Row, Col } from 'reactstrap';


class Friends extends Component {

    render () {

        return (
            <Container>
                <Row>
                    <Col>
                        <PendingFriends/>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <FriendSearch></FriendSearch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Friends;