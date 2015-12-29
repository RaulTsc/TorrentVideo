var express   = require('express'),
  serveStatic = require('serve-static'),
  app         = express(),
  PORT        = 5000

app.use(serveStatic(__dirname + '/build'))

app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT)
})
