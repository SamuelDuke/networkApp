import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


import Router from './router';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router authed={ this.props.authed }/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authed: state.authed
    }
}

export default connect(mapStateToProps)(App);
// export default App;
