import React from 'react'
import { Link } from 'react-router'
import MediaQuery from 'react-responsive'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import Auth from '../actions/auth'

const Login = React.createClass({

  contextTypes: {
    history: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      usernameFieldState: '',
      passwordFieldState: ''
    }
  },

  navTo (obj, to) {
    this.context.history.pushState(obj, to)
  },

  login() {
    const self = this

    let loginInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    }

    function cb (res) {
      if(res.success) {
        self.navTo(null, '/')
      } else {
        let username = res.wrongUsername ? 'The username you have entered could not be found.' : ''
        let password = res.wrongPassword ? 'The password you have entered is incorrect.' : ''

        self.setState({
          usernameFieldState: username,
          passwordFieldState: password
        })
      }
    }

    if(this.props.Auth) {
      this.props.Auth.login(loginInfo, cb)
    } else {
      Auth.login(loginInfo, cb)
    }

  },

  render() {
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
          width: '400px'
        },
        phone: {
          width: '100%'
        }
      },
      anchor: {
        laptop: {
          textDecoration: 'initial',
          color: '#00bcd4',
          marginLeft: '5px'
        },
        phone: {
          textDecoration: 'initial',
          color: '#00bcd4',
          marginLeft: '5px'
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
              style={style.textfield.laptop}
              errorText={this.state.passwordFieldState}
              floatingLabelText='Password'
              type='password' />
            <br />
            <RaisedButton
              label='Login'
              secondary={true}
              style={style.raisedButton.laptop}
              onTouchTap={this.login} />
            <p>Not a member?
              <Link to='/signup' style={style.anchor.laptop}>Sign up!</Link>
            </p>
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
              style={style.textfield.phone}
              errorText={this.state.passwordFieldState}
              floatingLabelText='Password'
              type='password' />
            <br />
            <RaisedButton
              label='Login'
              secondary={true}
              style={style.raisedButton.phone}
              onTouchTap={this.login} />
            <p>Not a member?
              <Link to='/signup' style={style.anchor.phone}>Sign up!</Link>
            </p>
          </div>
        </MediaQuery>
      </div>

    )
  }

})

export default Login
