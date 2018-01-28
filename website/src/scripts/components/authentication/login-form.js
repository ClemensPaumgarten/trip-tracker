import {
  default as React,
  Component
} from 'react';

import {
  Button
} from 'react-bootstrap';

import FieldGroup from '../fieldgroup';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    let emailInput = e.target.value;

    this.setState({
      email: emailInput
    });
  }

  onChangePassword(e) {
    let passwordInput = e.target.value;

    this.setState({
      password: passwordInput
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let {
      email,
      password
    } = this.state;

    this.props.onLogin(email, password);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FieldGroup
          id='login-email'
          type='email'
          label='Email address'
          placeholder='Enter email'
          onChange={this.onChangeEmail}
        />
        <FieldGroup
          id='login-password'
          label='Password'
          type='password'
          onChange={this.onChangePassword}
        />
        <Button type='submit' bsStyle='primary'>Login</Button>
      </form>
    );
  }
}

