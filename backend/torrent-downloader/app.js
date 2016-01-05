var AutonomousDownloaderAPI = require('./api.js'),
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    app                     = require('express')(),
    Torrent                 = require('./models/torrent'),
    PORT                    = 3000,
    SHOULD_DOWNLOAD	        = true

// Express metadata
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Connect to database
mongoose.connect('mongodb://localhost:27017/torrentClient');

// Get data about torrents downloaded
app.get('/data', function(req, res) {
  autonomousDownloader.api.getTorrentsInDB(function (torrents) {
    res.send(torrents)
  })
})

app.get('/getInfo', function(req, res) {
  var info = autonomousDownloader.api.getDownloadInformation()
  res.send(info)
})

// Start server
app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT)
})

// Supports two types of XML feeds.
// 1) FL     -> FileList.ro
// 2) TV-RSS -> Tv-Rss.com
// Can instantiate any number of 'AutonomousDownloader', set them at any interval
// But they can only receive these two types of feeds (or any other with equivalent format)
function AutonomousDownloader() {
  // this.api = new AutonomousDownloaderAPI('http://filelist.ro/rss.php?feed=dl&cat=23&passkey=d368f140b704822cbcb10f28298d02f1', 'FL')
  this.api = new AutonomousDownloaderAPI('http://tv-rss.com/rss/116777170945/', 'TV-RSS')
}

// This is a so called 'downloadRoutine'. It uses the link
// we provided in the constructor to get the data, and after it
// gets and parses it, it starts downloading the files
AutonomousDownloader.prototype.downloadRoutine = function() {
  this.api.getTorrentsInfo(function() {
    this.api.downloadTorrents()
  }.bind(this))
}

// Instantiate the downloader object
var autonomousDownloader = new AutonomousDownloader()

// Need to do this so that it executes immediately aswell
// If we do only setInterval, the first time it executes is
// 12 hours from now
if(SHOULD_DOWNLOAD) {
  autonomousDownloader.downloadRoutine()
  setInterval(function() {
    autonomousDownloader.downloadRoutine()
  }, 1000 * 60 * 60 * 24) // Every 24 hours
}
// integrate something with i/o ports
// something like internet connection signal
// or how much hdd space we have
