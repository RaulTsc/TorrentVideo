import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Home from '../../src/app/components/Home'

describe('Home', () => {

  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(<Home />)
  const home = shallowRenderer.getRenderOutput()

  it('should have a div as container', () => {
    expect(home.type).to.equal('div')
  })

  it('should have an AppBar with title equal to TorrentVideo', () => {
    expect(home.props.children[0].props.title).to.equal('TorrentVideo')
  })

})
