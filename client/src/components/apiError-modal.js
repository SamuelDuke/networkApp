import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";

// props = [ header, body, navLink, linkUrl,]

class ApiErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> { this.props.header }</ModalHeader>
                    <ModalBody>
                        { this.props.body }
                    </ModalBody>
                    <ModalFooter>
                        { this.props.navLink ? <NavLink tag={Link} to={ this.props.linkUrl }>Login</NavLink> : <div></div>}

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ApiErrorModal;