import React from 'react'
import { Link } from 'react-router'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import Auth from '../actions/auth'

const Signup = React.createClass({

  contextTypes: {
    history: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      usernameFieldState: '',
      passwordFieldState: '',
      repasswordFieldState: '',
      passwordFieldValue: '',
      repasswordFieldValue: ''
    }
  },

  onSignupPress () {
    const self = this

    let signupInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      repassword: this.refs.repassword.getValue()
    }

    function cb(res) {
      if(res.success) {
        self.context.history.pushState(null, '/')
      } else {
        var username = !!res.wrongUsername ? 'The username is already taken.' : ''

        self.setState({
          usernameFieldState: username
        })
      }
    }

    Auth.signup(signupInfo, cb)
  },

  checkEqualPw (oEvent) {
    var stateObj = {},
      self       = this

    if(oEvent.target.id === 'password') {
      stateObj.passwordFieldValue = oEvent.target.value
    } else {
      stateObj.repasswordFieldValue = oEvent.target.value
    }

    this.setState(stateObj, function () {
      if (self.state.passwordFieldValue === self.state.repasswordFieldValue) {
        self.setState({
          passwordFieldState: '',
          repasswordFieldState: ''
        })
      } else {
        self.setState({
          passwordFieldState: 'These fields should match',
          repasswordFieldState: 'These fields should match'
        })
      }
    })
  },

  render () {
    let style = {
      raisedButton: {
        marginTop: '20px'
      },
      container: {
        paddingTop: '200px',
        textAlign: 'center'
      },
      textfield: {
        width: '400px'
      }
    }

    return (
      <div style={style.container}>
        <TextField
          ref='username'
          style={style.textfield}
          errorText={this.state.usernameFieldState}
          floatingLabelText='Username' />
        <br />
        <TextField
          ref='password'
          id='password'
          style={style.textfield}
          errorText={this.state.passwordFieldState}
          onChange={this.checkEqualPw}
          floatingLabelText='Password'
          type='password' />
        <br />
        <TextField
          ref='repassword'
          id='repassword'
          style={style.textfield}
          errorText={this.state.repasswordFieldState}
          onChange={this.checkEqualPw}
          floatingLabelText='Re-enter Password'
          type='password' />
        <br />
        <RaisedButton
          label='Sign up'
          secondary={true}
          style={style.raisedButton}
          onTouchTap={this.onSignupPress} />
      </div>
    )
  }

})

export default Signup
