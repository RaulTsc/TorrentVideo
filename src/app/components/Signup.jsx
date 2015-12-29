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
      rePasswordFieldState: ''
    }
  },

  onRegisterPress () {
    const self = this

    let registerInfo = {
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

    Auth.register(registerInfo, cb)
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
          style={style.textfield}
          errorText={this.state.passwordFieldState}
          floatingLabelText='Password'
          type='password' />
        <br />
        <TextField
          ref='repassword'
          style={style.textfield}
          errorText={this.state.rePasswordFieldState}
          floatingLabelText='Re-enter Password'
          type='password' />
        <br />
        <RaisedButton
          label='Register'
          secondary={true}
          style={style.raisedButton}
          onTouchTap={this.onRegisterPress} />
      </div>
    )
  }

})

export default Signup
