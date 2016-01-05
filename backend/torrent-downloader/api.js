var http          = require('http'),
    xml2js        = require('xml2js'),
    webtorrent    = require('webtorrent')(),
    fs            = require('fs'),
    Torrent       = require('./models/torrent')

// srcUrl -- the actual URL in XML format from where we get the data
// src    -- can be either FL or TV-RSS, depending on srcUrl
function AutonomousDownloaderAPI(srcUrl, src) {
  this.srcUrl   = srcUrl || '',
  this.source   = src || ''
}

// Makes a HTTP GET request to srcUrl and parses that response
// The parsed information is stored on this.parsedData
AutonomousDownloaderAPI.prototype.getTorrentsInfo = function(cb) {
  // Need this so we don't get an ugly exception if it is
  // Ever used without a callback
  cb = cb || function(){}
  // Need reference to this and to change the url into a more
  // friendly format
  var that = this,
      transformedUrl = this.srcUrl.replace(/.*?:\/\//g, ''),
      options

  // The request is different based on the link
  if(this.source === 'TV-RSS') {
    options = {
      host: transformedUrl.split('/')[0],
      path: '/'+transformedUrl.split('/')[1] + '/' + transformedUrl.split('/')[2] + '/'
    }
  } else if(this.source === 'FL'){
    options = {
      host: transformedUrl.split('/')[0],
      path: '/'+transformedUrl.split('/')[1]
    }
  }

  // The actual HTTP GET request
  http.request(options, function(response) {
    var responseData = ''

    // On data, store it
    response.on('data', function(chunk) {
      responseData += chunk
    })

    // On end, transform it from XML to JSON
    response.on('end', function() {
      xml2js.parseString(responseData, function(err, parsedData) {
        that.parsedData = parsedData
        cb()
      })
    })
  }).end()
}

// Call this after we got information about the torrents from the XML feed
AutonomousDownloaderAPI.prototype.downloadTorrents = function() {
  var that = this,
      torrentsInfo = this.parsedData.rss.channel[0].item

  torrentsInfo.forEach(function(item) {
    var dldLink

    // Depends on the source. They have different format. Can be easily extended
    if(this.source === 'TV-RSS') {
      dldLink = item.enclosure[0]["$"].url
    } else {
      dldLink = item.link[0]
    }

    webtorrent.download(dldLink, function(torrent) {
      // Filter so that we only get the .mp4 files. All torrents also have something
      // like a .nfo file and a -sample file, we don't need those
      function onlyVideoFiles(item) {
        return (item.name.search('.mp4') !== -1) && item.name.search('sample') === -1
      }

      // Pipe them from the web to our HDD
      torrent.files.filter(onlyVideoFiles).forEach(function (file) {
        var src = file.createReadStream(),
            dst = fs.createWriteStream('./downloadedFiles/' + file.name)
        src.pipe(dst)
      })

      // Store info on this for data polling
      torrent.on('download', function () {
        that.downloadSpeed = torrent.downloadSpeed()
        that.progress      = torrent.progress
      })

      // When the torrent is finished downloading, save it to the database
      torrent.on('done', function() {
        torrent.files.filter(onlyVideoFiles).forEach(function(file) {
          var objForSave = {
            title: file.name,
            link: file.name
          }
          that.saveTorrentInfo(objForSave)
        })
      })
    })
  })
}

// Call it to get a JSON object with info about the current state
AutonomousDownloaderAPI.prototype.getDownloadInformation = function() {
  return {
    downloadSpeed: this.downloadSpeed,
    progress: this.progress
  }
}

// Saves stuff in the databae
AutonomousDownloaderAPI.prototype.saveTorrentInfo = function(torrent) {
  // Try to find the torrent
  Torrent.findOne({title: torrent.title}, function(dbTorrent) {
    // If found, no need to save again. If not save it
    if(dbTorrent) {
      // Error
    } else {
      var newTorrent = new Torrent(torrent)
      newTorrent.save(newTorrent, function(err) {
        if(err) { throw new Error(err); }
        // Succesful
      })
    }
  })
}

// Helper, in case we ever need to remove a torrent from the database
AutonomousDownloaderAPI.prototype.removeTorrentInfo = function(torrent) {
  Torrent.findOne({name: torrent.name}, function(dbTorrent) {
    if(dbTorrent) { dbTorrent.remove() }
  })
}

// Get torrents from the database
AutonomousDownloaderAPI.prototype.getTorrentsInDB = function(cb) {
  cb = cb || function () {}

  function removeDuplicates (torrents) {
    var uniqueArray = []
    var isUnique = true

    for(var i = 0; i < torrents.length; i++) {
      for(var j = 0; j < uniqueArray.length; j++) {
        if(torrents[i].title === uniqueArray[j].title) { isUnique = false }
      }

      if(!isUnique) {
        isUnique = true
      } else {
        uniqueArray.push(torrents[i])
      }
    }

    return uniqueArray
  }

  Torrent.find({}, function(err, torrents) {
    if(err) { throw err }

    cb(removeDuplicates(torrents))
  })
}

// Expose the API
module.exports = AutonomousDownloaderAPI
