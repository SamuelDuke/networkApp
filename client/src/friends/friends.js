import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
// import _ from 'lodash';

import ScrollBox from '../components/scrollBox';
import { fetchFriends } from '../actions';

class Friends extends Component {
    componentWillMount() {
        this.props.fetchFriends();
    }

    render() {
        // const containerStyle = {
        //     marginBottom: '25px'
        // };


        const search = (value, array) => {
            console.log('array', typeof array);
            console.log('value', value);
            // let a = _.map(array, (a) => {
            //     if (a.firstName.includes(value) || a.lastName.includes(value)) {
            //         console.log(a.firstName, a.lastName);
            //     }
            // });
        };

        const uniqueId = this.props.uniqueId;
        return(
            <div>
                <input type="text"/>
                <button onClick={() => {search('Sam',this.props.friends)}}>Search</button>
                <ScrollBox uniqueId={uniqueId} itemList={this.props.friends}/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ fetchFriends }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Friends);
