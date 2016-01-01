var jsdom = require('jsdom')

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.$ = require('jquery')
global.navigator = {userAgent: 'node.js'}
global.localStorage = {}
