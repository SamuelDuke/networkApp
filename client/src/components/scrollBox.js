import React from 'react';
import _ from 'lodash';
// import { Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';
import { Row, Col } from 'reactstrap';

const ScrollBox = (props) => {
    const itemList = props.itemList;
    const uniqueId = props.uniqueId;

    const imgStyle = {
        width: '65px',
        height: '65px',
        padding: '10px',
        borderRadius: '15px'
    };



    const createList = (itemList) => {
        return _.map(itemList, (item) => {
            return (
                <li onClick={()=> {console.log(item.firstName)}} key={uniqueId + item.userID}>

                    <Row>

                            <img style={imgStyle} src={item.profilePhoto} alt=''/>

                        <Col>
                            <Row>
                                <b>{item.firstName}</b>
                            </Row>
                            <Row>
                                {item.lastName}
                            </Row>
                        </Col>
                    </Row>
                </li>
            )
        });
    };

    const divStyle = {
        height: '400px',
        width:'300px',
        border: '1px solid #ccc',
        font: '16px/26px Georgia, Garamond, Serif',
        overflow: 'auto',
        borderRadius: '10px'
    };

    const ulStyle = {
        listStyleType: 'none'
    };

    return (


        <div style={divStyle}>
            <ul style={ulStyle}>
                {createList(itemList)}
            </ul>

        </div>


    )
};

export default ScrollBox;