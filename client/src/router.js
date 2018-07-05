import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';

import MyNavbar from './navbar/navbar-container';
import Home from './home/home';
import Login from './login/login';

import Friends from './findFriends/findFriends';
// import FindFriend from './findFriend/findFriend';
// import Login from './auth/loginPage-component';
import Register from './register/register';
import ProfilePage from './profile/profile';

export const urlConstants = {
    findFriend: '/findfriend',
    login: '/login',
    profile: '/profile',
    register: '/register',
    home: '/'
};

function PrivateRoute({component: Component, ...rest}) {
    const authenticated = () => {
        const authToken = localStorage.getItem('auth_token');
        if (authToken !== 'undefined' && authToken !== null) {
            return authToken !== 'undefined' && authToken !== null;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) => authenticated() === true
                ? <Component {...props} />
                : <Redirect to={{pathname: urlConstants.login, state: {from: props.location}}}/>}
        />
    )
}


const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <MyNavbar />
                <Container>
                    <Switch>
                        <PrivateRoute  path={urlConstants.profile} component={ ProfilePage }/>
                        <PrivateRoute  path={urlConstants.findFriend} component={ Friends }/>
                        <Route path={urlConstants.register} component={ Register }/>
                        <Route path={urlConstants.login} component={ Login }/>
                        <Route path={urlConstants.home} component={ Home }/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    )
};



export default Router;