import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

const UserCard = (props) => {
    const user = props.user;
    const onButtonClick = props.onButtonClick;
    const buttonText = props.buttonText;

    const divStyle = {
        height: '100%',
        width: '300px'
    };

    return (
        <div style={divStyle}>
            <Card >
                <CardBody>
                    <CardImg  src={user.profilePhoto}/>
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>

                    <Button onClick={() => {
                        onButtonClick(user);
                    }}>{buttonText}</Button>
                </CardBody>
            </Card>
        </div>


    )
};

export default UserCard;