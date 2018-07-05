import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class ProfilePage extends Component {
    state = { redirect: false };

    render() {
        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to='/' />
        }

        const divStyle = {
            height: '300px',
            width: '300px',
            marginTop: '10px'
        };

        return(
            <div style={divStyle}>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.user.firstName} {this.props.user.lastName}</CardTitle>
                        <CardImg src={`${this.props.user.profilePhoto}`}/>
                        <CardText>{this.props.user.userID}</CardText>
                    </CardBody>
                </Card>
            </div>

        )

        // return(
        //     <div>
        //         <h3>Profile</h3>
        //
        //         <div>
        //             <br/>
        //
        //             <h4>Member Info: </h4>
        //             <div>Name: {this.props.user.firstName} {this.props.user.lastName}</div>
        //             <div>ID: {this.props.user.userID}</div>
        //         </div>
        //     </div>
        // )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ProfilePage);
