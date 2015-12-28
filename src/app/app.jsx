import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory, Router, Route, Link } from 'react-router'

import Main from './components/main'; // Our custom react component
import Login from './components/Login'
import Signup from './components/Signup'

import Auth from './actions/auth'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const isLoggedIn = false

function requireAuth (nextState, replaceState) {
  if(!isLoggedIn) {
    replaceState({ nextPathName: nextState.location.pathname }, '/login')
  }
}

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Main} onEnter={requireAuth} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
  </Router>
), document.getElementById('app'));
