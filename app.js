var express   = require('express'),
  serveStatic = require('serve-static'),
  bodyParser  = require('body-parser'),
  jwt         = require('jsonwebtoken'),
  path        = require('path'),
  http        = require('http'),
  Account     = require('./models/accounts'),
  mongoose    = require('mongoose'),
  app         = express(),
  PORT        = 5000

// Connect to DB
mongoose.connect('mongodb://localhost/torrentvideo')

// Express metadata
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic(__dirname + '/build'))

// Start server
app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT)
})

// Routes

// Handle login
app.post('/login', function (req, res) {
  var response = {}
  Account.findOne({username: req.body.username}, function (err, acc) {
    if (err) { throw err }
    if (acc) {
      if (acc.password === req.body.password) {
        response = {
          success: true,
          token: jwt.sign(acc.username, 'randomString', { expiresInSeconds: 86400 })
        }
      } else {
        response = {
          success: false,
          wrongPassword: true
        }
      }
    } else {
      response = {
        success: false,
        wrongUsername: true
      }
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
      response = {
        success: false,
        wrongUsername: true
      }
      res.send(response)
    } else {
      var newAcc = new Account(req.body)
      newAcc.save(function (err) {
        if(err) { throw err }
        response = {
          success: true,
          token: jwt.sign(newAcc.username, 'randomString', { expiresInSeconds: 86400 })
        }
        res.send(response)
      })
    }
  })
})

var DATA_OBJECT = [],
    SRV_INFO    = {     // Info about the other node instance, the one downloading the torrents
      host: 'localhost',
      port: '3000',
      path: '/data'
    }

// Get data about the torrents
app.get('/getData', function (req, res) {
  res.send(DATA_OBJECT)
})

function createEndpoints () {
  DATA_OBJECT.forEach(function (item) {
    app.get('/'+item.url, function (req, res) {
      var dldLink = path.join(__dirname, '../AutonomousTorrentDownloading/downloadedFiles', item.url)
      res.download(dldLink)
    })
  })
}

function pollData () {
  http.request(SRV_INFO, function (res) {
    var resData = ''

    res.on('data', function (chunk) {
      resData += chunk
    })

    res.on('end', function () {
      resData = JSON.parse(resData)
      DATA_OBJECT = []

      function goodFormat (item) {
        return item.hasOwnProperty('link') && item.hasOwnProperty('title')
      }

      resData.filter(goodFormat).forEach(function(item) {
        DATA_OBJECT.push({
          url: item.link,
          name: item.title
        })
      })

      createEndpoints()
    })
  }).end()
}
pollData()
setInterval(pollData, 1000 * 60)    // Every 60 seconds
