import React from 'react';
import _ from 'lodash';
import UserCard  from '../components/userCard';
import { Row, Col, CardColumns} from 'reactstrap';

const createUserList = (users, onButtonClick, buttonText) => {
    return _.map(users, (user) => {
        return (
            <Row key={user.userID}>
                <Col>
                    <UserCard sm="4"  user={user} onButtonClick={onButtonClick} buttonText={buttonText} />
                </Col>
            </Row>
        )
    });
};

const UserCardList = (props) => {
    const usersList = props.usersList;
    const onButtonClick = props.onButtonClick;
    const buttonText = props.buttonText;
    return (
        <CardColumns>
            {createUserList(usersList, onButtonClick, buttonText)}
        </CardColumns>
    )
};

export default UserCardList;