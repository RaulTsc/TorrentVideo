import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';

import Auth from '../actions/auth'

const Home = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  contextTypes: {
    history: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      open: false
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  logout() {
    this.context.history.pushState(null, '/login')
    Auth.logout()
  },

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <a href='#' onClick={this.logout}>Log out</a>
      </div>
    );
  },
});

export default Home
