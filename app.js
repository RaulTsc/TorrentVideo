var express   = require('express'),
  serveStatic = require('serve-static'),
  bodyParser  = require('body-parser'),
  jwt         = require('jsonwebtoken'),
  path        = require('path'),
  http        = require('http'),
  Account     = require('./backend/models/accounts'),
  mongoose    = require('mongoose'),
  app         = express(),
  PORT        = 5000

  var TorrentDownloader = require('./backend/torrent-downloader/index') // needs another refactor
  var torrents = new TorrentDownloader(SHOULD_DOWNLOAD)
  var Videos = require('./backend/videos/index')
  var videos = new Videos(app, torrents, interval) // required up top


// Connect to DB
mongoose.connect('mongodb://localhost/torrentvideo')

// Express metadata
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic(__dirname + '/build'))

// Start server
app.listen(PORT, function () {
  console.info('Server listening on port ' + PORT)
})

// Handle login
app.post('/login', function (req, res) {
  var response = {}
  Account.findOne({username: req.body.username}, function (err, acc) {
    if (err) { throw err }

    if (acc) {
      if (acc.password === req.body.password) {
        response.success: true,
        response.token: jwt.sign(acc.username, 'randomString', { expiresInSeconds: 86400 })
      } else {
        response.success: false,
        response.wrongPassword: true
      }
    } else {
      response.success: false,
      response.wrongUsername: true
    }

    res.send(response)
  })
})

// Handle signup
app.post('/signup', function (req, res) {
  var response = {}
  Account.findOne({username: req.body.username}, function (err, acc) {
    if(err) { throw err }

    if(acc) {
      response.success: false,
      response.wrongUsername: true
    } else {
      var newAcc = new Account(req.body)
      newAcc.save(function (err) {
        if(err) { throw err }
        response.success: true,
        response.token: jwt.sign(newAcc.username, 'randomString', { expiresInSeconds: 86400 })
      })
    }

    res.send(response)
  })
})

app.get('/getData', function (req, res) {
  var x = torrents.getData() // or something like that
  res.send(x)
})
