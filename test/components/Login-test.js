import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Login from '../../src/app/components/Login'
import Auth from '../../src/app/actions/auth'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

describe('Login', () => {
  let renderedComponent

  beforeEach(() => {
    renderedComponent = TestUtils.renderIntoDocument(<Login Auth={Auth} />)
  })

  it('should exist and should have two input fields a button and a p with proper texts', () => {
    let inputs = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'input'
    )
    let labels = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'label'
    )
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'button'
    )
    let ps = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'p'
    )

    function toTextContent (item) {
      return ReactDOM.findDOMNode(item).textContent
    }

    expect(renderedComponent).to.not.equal(undefined)
    expect(inputs.length).to.equal(2)
    expect(buttons.length).to.equal(1)
    expect(ps.length).to.equal(1)
    expect(labels.map(toTextContent)).that.deep.equals([
      'Username', 'Password'
    ])
    expect(buttons.map(toTextContent)).that.deep.equals([
      'Login'
    ])
    expect(ps.map(toTextContent)).that.deep.equals([
      'Not a member?Sign up!'
    ])
  })

  xit('should have call .login() on button click and behave a', () => {
    let StubAuth = {
      login: function (loginInfo, cb) {
        console.log(loginInfo)
      }
    }

    renderedComponent = TestUtils.renderIntoDocument(<Login Auth={StubAuth} />)
    renderedComponent.navTo = function () {}

    let inputs = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'input'
    )
    let button = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'button'
    )[0]

    TestUtils.Simulate.change(inputs[0], {
      target: {
        value: 'penis'
      }
    })
    TestUtils.Simulate.change(inputs[1], {
      target: {
        value: 'penis2'
      }
    })

    TestUtils.Simulate.touchTap(button)

  })

})
