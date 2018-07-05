import React, { Component } from 'react';
import Friends from '../friends/friends';

import { Row, Col } from 'reactstrap';

class Home extends Component {
    render() {
        return(
            <div>
                <Row>
                    <Col>
                        <h2>Home</h2>
                    </Col>
                </Row>
                <Row>
                    <Col><Friends uniqueId='1'/></Col>
                    <Col><Friends uniqueId='2'/></Col>
                </Row>



            </div>
        )
    }
}

export default (Home);
