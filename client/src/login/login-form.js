import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {Field, reduxForm, reset } from 'redux-form';
import { Button, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { urlConstants } from '../router';

import { loginUser } from '../actions'

const afterSubmit = (result, dispatch) => {
    dispatch(reset('FormLogin'))
};


class LoginForm extends Component {

    renderField(field) {
        return (
            <FormGroup>
                <Label for={field.name}>{ field.label }</Label>
                <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    valid={field.meta.touched && !field.meta.error ? true : false}
                    invalid={field.meta.touched && field.meta.error ? true : false}
                    {...field.input}/>
                <FormFeedback>
                    { field.meta.touched ? field.meta.error : '' }
                </FormFeedback>
            </FormGroup>
        )
    }

    onSubmit (values) {
        this.props.loginUser(values);
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to={urlConstants.profile} />
        }

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='Email'
                    type='email'
                    name='email'
                    placeholder='YourEmail@something.com'
                    component={this.renderField}
                >
                </Field>

                <Field
                    label='Password'
                    type='password'
                    name='password'
                    placeholder='Enter Your Password'
                    component={this.renderField}
                >
                </Field>

                <Button>Submit</Button>
            </form>
        )
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validate(values) {
    const errors = {};

    if (!validateEmail(values.email)) {
        errors.email = 'Please enter a valid email address.'
    }
    if (!values.email) {
        errors.email = 'Enter your email!';
    }
    if (!values.password) {
        errors.password = 'Enter your your password';
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser }, dispatch);
}

export default reduxForm({
    validate,
    form: 'FormLogin',
    onSubmitSuccess: afterSubmit
})(
    connect(mapStateToProps, matchDispatchToProps)(LoginForm)
);