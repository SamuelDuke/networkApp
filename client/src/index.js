import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// npm install --save react-redux redux redux-logger redux-promise-middleware axios redux-form react-router-dom lodash jwt-decode
// npm install --save bootstrap reactstrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import * as reducers from './reducers/';

const middleware = applyMiddleware(logger, promise());
// const middleware = applyMiddleware( promise());
const store = createStore(combineReducers(reducers), middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

