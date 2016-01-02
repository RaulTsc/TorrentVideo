import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Home from '../../src/app/components/Home'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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

  it('should have an <h1> tag with the text TorrentVideo inside the AppBar', () => {
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )[0]

    expect(appBar.childNodes[1].innerHTML).to.equal('TorrentVideo')
  })

  it('should call .logout() when clicking the second button', () => {
    localStorage.token = 'someToken'
    renderedComponent.navToLogin = function () {}
    let appBar = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'appBar'
    )[0]
    let buttonComp = appBar.childNodes[2].childNodes[0]

    TestUtils.Simulate.touchTap(buttonComp)
    expect(localStorage.token).to.equal(undefined)
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
          name: 'someName'
        }
      ])
    }

    renderedComponent.componentDidMount()
    expect(renderedComponent.state).that.deep.equals({
      items: [{
        url: 'someUrl',
        name: 'someName'
      }],
      selectedItem: 'someUrl'
    })
  })

  it('should have a MovieList component with a header with text Latest Videos', () => {
    let movieList = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'movieList'
    )[0]

    expect(movieList.childNodes[0].innerHTML).to.equal('Latest Videos')
  })

  it('should have a MovieList component with the items set as .makeRequest() returns', () => {
    let movieList = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'movieList'
    )[0]

    function getFirstItemMovieList () {
      return movieList.childNodes[1]
    }

    renderedComponent.makeRequest = function (cb) {
      cb([
        {
          url: 'someUrl',
          name: 'someName'
        }
      ])
    }

    renderedComponent.componentDidMount()
    var item = getFirstItemMovieList()
    expect(item.textContent).to.equal('someName')
  })

  it('should change this.state.selectedItem when an item in MovieList is clicked', () => {
    let movieList = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'movieList'
    )[0]

    function getFirstItemMovieList () {
      return movieList.childNodes[1]
    }

    function getSecondItemMovieList () {
      return movieList.childNodes[2]
    }

    renderedComponent.makeRequest = function (cb) {
      cb([
        {
          url: 'someUrl',
          name: 'someName'
        },
        {
          url: 'someUrl2',
          name: 'someName2'
        }
      ])
    }

    renderedComponent.componentDidMount()
    let item = getSecondItemMovieList().childNodes[0]
    TestUtils.Simulate.touchTap(item)
    expect(renderedComponent.state.selectedItem).to.equal('someName2')

    item = getFirstItemMovieList().childNodes[0]
    TestUtils.Simulate.touchTap(item)
    expect(renderedComponent.state.selectedItem).to.equal('someName')
  })

})
