import React from 'react'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import { Link } from 'react-router'

const Signup = React.createClass({

  getInitialState() {
    return {
      usernameFieldState: '',
      passwordFieldState: '',
      rePasswordFieldState: ''
    }
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
        <TextField
          ref='password'
          style={textfieldStyle}
          errorText={this.state.rePasswordFieldState}
          floatingLabelText='Re-enter Password'
          type='password' />
        <br />
        <RaisedButton
          label='Register'
          secondary={true}
          style={raisedButtonStyle}
          onTouchTap={this.onLoginPress} />
      </div>
    )
  }

})

export default Signup
