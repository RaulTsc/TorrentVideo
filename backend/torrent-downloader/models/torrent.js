var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var torrentSchema = new Schema({
  title: String,
  link: String,
  description: String
});

module.exports = mongoose.model('Torrent', torrentSchema);
