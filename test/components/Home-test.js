import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import ReactDOM from 'react-dom'

import Home from '../../src/app/components/Home'

describe('Home', () => {
  let renderedComponent

  beforeEach(() => {
    renderedComponent = TestUtils.renderIntoDocument(<Home />)
  })

  it('should have an AppBar', () => {
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )
    expect(appBar.length).to.equal(1)
  })

  it('should have two buttons and a <h1> tag inside the AppBar', () => {
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )[0]
    expect(appBar.childNodes.length).to.equal(3)
    expect(appBar.childNodes[0].childNodes[0].tagName).to.equal('BUTTON')
    expect(appBar.childNodes[1].tagName).to.equal('H1')
    expect(appBar.childNodes[2].childNodes[0].tagName).to.equal('BUTTON')
  })

  it('should have an <h1> tag with text TorrentVideo inside the AppBar', () => {
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )[0]
    expect(appBar.childNodes[1].innerHTML).to.equal('TorrentVideo')
  })

  it('should call .logout() when clicking the second button', () => {
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )[0]
    let wasCalled = false

    renderedComponent.logout = function () {
      wasCalled = true
    }
    let buttonComp = ReactDOM.findDOMNode(appBar.childNodes[2])
    TestUtils.Simulate.click(buttonComp)
    expect(wasCalled).to.equal(true)
  })

  it('has a movie list component', () => {
    let movieList = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'movieList'
    )
    expect(movieList.length).to.equal(1)
  })

  it('has items=[] and selectedItem="" as initial state', () => {
    expect(renderedComponent.getInitialState()).that.deep.equals({
      items: [],
      selectedItem: ''
    })
  })

  it('has state.items equal to what makeRequest returns', () => {
    renderedComponent.makeRequest = function (cb) {
      cb([
        {
          url: 'someUrl',
          name: 'someTitle'
        }
      ])
    }
    renderedComponent.componentDidMount()
    expect(renderedComponent.state).that.deep.equals({
      items: [{
        url: 'someUrl',
        name: 'someTitle'
      }],
      selectedItem: 'someUrl'
    })
  })

})
