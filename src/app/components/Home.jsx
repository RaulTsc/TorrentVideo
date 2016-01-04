import React from 'react'
import MediaQuery from 'react-responsive'

import AppBar from 'material-ui/lib/app-bar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import AvVideoLibrary from 'material-ui/lib/svg-icons/av/video-library'
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'

import Auth from '../actions/auth'

const Video = React.createClass({
  render () {
    return (
      <video src={this.props.item} controls preload="auto" style={this.props.style}>
      </video>
    )
  }
})

const MovieList = React.createClass({
  onUpdate (oEvent) {
    this.props.onUpdate(oEvent.target.textContent)
  },

  render () {
    const self = this
    let movieList = this.props.items.map(function (item) {
      item.name = item.name || 'auxKey'
      return (
        <ListItem key={item.name} primaryText={item.name} onTouchTap={self.onUpdate} style={self.props.listItemStyle} />
      )
    })

    return (
      <List
        className='movieList'
        subheader='Latest Videos'
        style={this.props.style}>
        {movieList}
      </List>
    )
  }
})

const Home = React.createClass({

  contextTypes: {
    history: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      items: [],
      selectedItem: ''
    }
  },

  navToLogin() {
    this.context.history.pushState(null, '/login')
  },

  logout() {
    Auth.logout()
    this.navToLogin()
  },

  makeRequest (cb) {
    fetch('/getData', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      if(res.ok) {
        res.json().then(function (data) {
          cb(data)
        })
      } else {
        // Error; Server might be down or whatever
      }
    })
  },

  componentDidMount () {
    const self = this
    function cb (data) {
      self.setState({
        items: data,
        selectedItem: data[0].url
      })
    }

    this.makeRequest(cb)
  },

  onUpdate (item) {
    this.setState({
      selectedItem: item
    })
  },

  isLoggedIn () {
    return Auth.isLoggedIn()
  },

  render() {

    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <div>
            <AppBar
              className='appBar'
              title='TorrentVideo'
              iconElementLeft={<IconButton><AvVideoLibrary /></IconButton>}
              iconElementRight={<IconButton onTouchTap={this.logout}><ActionPowerSettingsNew /></IconButton>} />
            <center style={{marginTop: 200}}>
              <GridList cellHeight={300} style={{width: '100%'}}>
                <GridTile style={{overflowY: 'auto'}}>
                  <MovieList items={this.state.items} onUpdate={this.onUpdate} listItemStyle={{wordWrap: 'break-word'}} />
                </GridTile>
                <GridTile>
                  <Video item={this.state.selectedItem} style={{width: '520px', height: '300px'}} />
                </GridTile>
              </GridList>
            </center>
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <AppBar
            className='appBar'
            title='TorrentVideo'
            iconElementLeft={<IconButton><AvVideoLibrary /></IconButton>}
            iconElementRight={<IconButton onTouchTap={this.logout}><ActionPowerSettingsNew /></IconButton>} />
          <center>
            <GridList cols={1} rows={2} cellHeight={250} style={{width: '100%'}}>
              <GridTile style={{overflowY: 'auto'}}>
                <MovieList items={this.state.items} onUpdate={this.onUpdate} listItemStyle={{wordWrap: 'break-word'}} />
              </GridTile>
              <GridTile style={{marginTop: '50px'}}>
                <Video item={this.state.selectedItem} style={{width: '335px', height: '200px'}} />
              </GridTile>
            </GridList>
          </center>
        </MediaQuery>
      </div>
    )
  }
})

export default Home
