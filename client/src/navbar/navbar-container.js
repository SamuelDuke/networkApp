import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

import { urlConstants } from '../router';

import {logoutUser} from "../actions";

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to={urlConstants.home}>reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {this.props.user.userID ?
                                    <NavLink tag={Link} to={urlConstants.findFriend}>Find Friends</NavLink>:
                                    <div></div>
                                }
                            </NavItem>
                            <NavItem>
                                {this.props.user.userID ?
                                    <NavLink tag={Link} to={urlConstants.profile}>Profile</NavLink>:
                                    <NavLink tag={Link} to={urlConstants.register}>Register</NavLink>
                                }
                            </NavItem>
                            <NavItem>
                                {this.props.user.userID ?

                                    <div onClick={()=>{this.props.logoutUser()}}>
                                        <NavLink tag={Link} to={urlConstants.home}>Logout</NavLink>
                                    </div>:
                                    <NavLink tag={Link} to={urlConstants.login}>Login</NavLink>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MyNavbar)
