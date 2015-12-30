var express   = require('express'),
  serveStatic = require('serve-static'),
  bodyParser  = require('body-parser'),
  jwt         = require('jsonwebtoken'),
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
