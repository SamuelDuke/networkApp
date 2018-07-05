import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { Button, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { urlConstants } from '../router';
import ApiErrorModal from '../components/apiError-modal';

import { registerUserService } from './register-service';

const afterSubmit = (result, dispatch) => {
    dispatch(reset('FormRegister'));
};

class RegisterForm extends Component {
    state = {
        emailAlreadyRegistered: null
    };

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
        registerUserService(values).then(
            res => {
                console.log('status', res);
                this.setState({ emailAlreadyRegistered: res });
            }
        );
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to={urlConstants.profile} />
        }

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='First Name'
                    type='text'
                    name='firstName'
                    placeholder='Enter your first name'
                    component={this.renderField}
                >
                </Field>
                <Field
                    label='Last Name'
                    type='text'
                    name='lastName'
                    placeholder='Enter your last name'
                    component={this.renderField}
                >
                </Field>
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

                <Field
                    label='Verify Password'
                    type='password'
                    name='verifyPassword'
                    placeholder='Verify Your Password'
                    component={this.renderField}
                >
                </Field>
                { this.state.emailAlreadyRegistered ?
                    this.state.emailAlreadyRegistered.success ?
                        <Redirect to={urlConstants.login} /> :
                        <ApiErrorModal
                            header='Email already registered'
                            body={this.state.emailAlreadyRegistered.message}
                            navLink='Login'
                            linkUrl={urlConstants.login}>
                        </ApiErrorModal>
                    : <div></div>
                }
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

    // Validate the inputs from 'values'
    if (!values.firstName) {
        errors.firstName = 'Enter your first name!';
    }
    if (!values.lastName) {
        errors.lastName = 'Enter your last name!';
    }
    if (!validateEmail(values.email)) {
        errors.email = 'Please enter a valid email address.'
    }
    if (!values.email) {
        errors.email = 'Enter your email!';
    }
    if (!values.password) {
        errors.password = 'Enter your your password';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Enter confirm your password!';
    }
    if (values.password !== values.verifyPassword && values.verifyPassword) {
        errors.verifyPassword = 'Passwords do not match!';
        errors.password = 'Passwords do not match!';
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

export default reduxForm({
    validate,
    form: 'FormRegister',
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps)(RegisterForm)
);