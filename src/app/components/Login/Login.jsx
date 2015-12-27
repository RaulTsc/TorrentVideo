import React from 'react'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

const Login = React.createClass({

  getInitialState() {
    return {
      usernameFieldState: '',
      passwordFieldState: ''
    }
  },

  login() {

  },

  onLoginPress() {
    let loginInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    }

    function cb (res) {
      if(res.success) {
      } else {
        if(res.wrongUsername) {
          this.setState({
            usernameFieldState: 'The username you have entered could not be found.'
          })
        }

        if(res.wrongPassword) {
          this.setState({
            passwordFieldState: 'The password you have entered is incorrect.'
          })
        }
      }
    }

    this.login(loginInfo, cb)
  },

  render() {
    var raisedButtonStyle = {
      marginTop: '20px'
    }

    var containerStyle = {
      paddingTop: '200px',
      textAlign: 'center'
    }

    var textfieldStyle = {
      width: '400px'
    }

    return (
      <div style={containerStyle}>
        <TextField
          ref='username'
          style={textfieldStyle}
          errorText={this.state.usernameFieldState}
          floatingLabelText='Username' />
        <br />
        <TextField
          ref='password'
          style={textfieldStyle}
          errorText={this.state.passwordFieldState}
          floatingLabelText='Password'
          type='password' />
        <br />
        <RaisedButton
          label='Login'
          secondary={true}
          style={raisedButtonStyle}
          onTouchTap={this.onLoginPress} />
      </div>
    )
  }

})

export default Login
