import React from 'react'
import { Link } from 'react-router'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

const Login = React.createClass({

  getInitialState() {
    return {
      usernameFieldState: '',
      passwordFieldState: ''
    }
  },

  login(info, cb) {
    cb = cb || function () {}

    var USERNAME = 'Raul',
        PASSWORD = 'pw'
    var retVal = {}

    if(info.username === USERNAME && info.password === PASSWORD) {
      retVal.success = true
    }

    if(info.username !== USERNAME) {
      retVal.wrongUsername = true
    } else {
      retVal.wrongUsername = false
    }

    if(info.password !== PASSWORD) {
      retVal.wrongPassword = true
    } else {
      retVal.wrongPassword = false
    }

    cb(retVal)
  },

  onLoginPress() {
    let loginInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    }

    var that = this

    function cb (res) {
      if(res.success) {
      } else {
        if(!!res.wrongUsername) {
          that.setState({
            usernameFieldState: 'The username you have entered could not be found.'
          })
        } else {
          that.setState({
            usernameFieldState: ''
          })
        }

        if(!!res.wrongPassword) {
          that.setState({
            passwordFieldState: 'The password you have entered is incorrect.'
          })
        } else {
          console.log('here')
          that.setState({
            passwordFieldState: ''
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

    var anchorStyle = {
      textDecoration: 'initial',
      color: '#00bcd4',
      marginLeft: '5px'
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
        <p>Not a member?
          <Link to='/signup' style={anchorStyle}>Sign up!</Link>
        </p>
      </div>
    )
  }

})

export default Login
