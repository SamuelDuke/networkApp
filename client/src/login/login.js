import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import LoginForm from './login-form';

class Login extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col />
                    <Col >
                        <h3>Login</h3>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <LoginForm />
                    </Col>
                    <Col />
                </Row>
            </Container>
        )
    }
}

export default Login;
