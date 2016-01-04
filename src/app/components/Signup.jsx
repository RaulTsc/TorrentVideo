import React from 'react'
import MediaQuery from 'react-responsive'

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
        let username = res.wrongUsername ? 'The username is already taken.' : ''

        self.setState({
          usernameFieldState: username
        })
      }
    }

    Auth.signup(signupInfo, cb)
  },

  checkEqualPw (oEvent) {
    let stateObj = {},
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
        laptop: {
          marginTop: '20px'
        },
        phone: {
          marginTop: '20px'
        }
      },
      container: {
        laptop: {
          paddingTop: '200px',
          textAlign: 'center'
        },
        phone: {
          paddingTop: '200px',
          textAlign: 'center'
        }
      },
      textfield: {
        laptop: {
          width: '100%'
        },
        phone: {
          width: '100%'
        }
      }
    }

    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <div style={style.container.laptop}>
            <TextField
              ref='username'
              style={style.textfield.laptop}
              errorText={this.state.usernameFieldState}
              floatingLabelText='Username' />
            <br />
            <TextField
              ref='password'
              id='password'
              style={style.textfield.laptop}
              errorText={this.state.passwordFieldState}
              onChange={this.checkEqualPw}
              floatingLabelText='Password'
              type='password' />
            <br />
            <TextField
              ref='repassword'
              id='repassword'
              style={style.textfield.laptop}
              errorText={this.state.repasswordFieldState}
              onChange={this.checkEqualPw}
              floatingLabelText='Re-enter Password'
              type='password' />
            <br />
            <RaisedButton
              label='Sign up'
              secondary={true}
              style={style.raisedButton.laptop}
              onTouchTap={this.onSignupPress} />
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <div style={style.container.phone}>
            <TextField
              ref='username'
              style={style.textfield.phone}
              errorText={this.state.usernameFieldState}
              floatingLabelText='Username' />
            <br />
            <TextField
              ref='password'
              id='password'
              style={style.textfield.phone}
              errorText={this.state.passwordFieldState}
              onChange={this.checkEqualPw}
              floatingLabelText='Password'
              type='password' />
            <br />
            <TextField
              ref='repassword'
              id='repassword'
              style={style.textfield.phone}
              errorText={this.state.repasswordFieldState}
              onChange={this.checkEqualPw}
              floatingLabelText='Re-enter Password'
              type='password' />
            <br />
            <RaisedButton
              label='Sign up'
              secondary={true}
              style={style.raisedButton.phone}
              onTouchTap={this.onSignupPress} />
          </div>
        </MediaQuery>
      </div>
    )
  }

})

export default Signup
