import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { browserHistory, Router, Route } from 'react-router'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

import Auth from './actions/auth'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

function requireAuth (nextState, replaceState) {
  if(!Auth.isLoggedIn()) {
    replaceState({ nextPathName: nextState.location.pathname }, '/login')
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Home} onEnter={requireAuth} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
  </Router>
), document.getElementById('app'))
