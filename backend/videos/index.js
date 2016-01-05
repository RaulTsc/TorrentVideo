function Torrents (app, torrentdownloader, interval) {
  this.data;
  this.getData returns an empty array if no data. should not crash
  this.torrentdownloader; do stuff with this
  setInterval(function () {
    bla bla
    get data from app.js and put into this.data
    create end points
  }, interval)
}

module.exports = Torrents






// all of this goes to Torrents
var DATA_OBJECT = [],
    SRV_INFO = {     // Info about the other node instance, the one downloading the torrents
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
