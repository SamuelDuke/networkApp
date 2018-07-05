import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import RegisterForm from './register-form';

class Register extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col />
                    <Col >
                        <h3>Register</h3>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <RegisterForm />
                    </Col>
                    <Col />
                </Row>
            </Container>
        )
    }
}

export default Register;
