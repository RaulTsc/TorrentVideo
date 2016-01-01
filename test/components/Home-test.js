import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import ReactDOM from 'react-dom'

import Home from '../../src/app/components/Home'

describe('Home', () => {

  let renderedComponent = TestUtils.renderIntoDocument(<Home />)

  it('should have a <h1> tag with text "TorrentVideo"', () => {
    let h1Component = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'h1'
    )
    expect(h1Component.innerHTML).to.equal('TorrentVideo')
  })

  it('should have two buttons inside the AppBar', () => {
    let buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'button'
    )
    expect(buttonComponents.length).to.equal(2)
  })

  it('has items=[] and selectedItem="" as initial state', () => {
    expect(renderedComponent.getInitialState()).that.deep.equals({
      items: [],
      selectedItem: ''
    })
  })

  it('has an object on state.items', () => {
    renderedComponent.makeRequest = function (cb) {
      cb([
        {
          url: 'someUrl',
          title: 'someTitle'
        }
      ])
    }
    renderedComponent.componentDidMount()
    expect(renderedComponent.state).that.deep.equals({
      items: [{
        url: 'someUrl',
        title: 'someTitle'
      }],
      selectedItem: 'someUrl'
    })
  })

})
