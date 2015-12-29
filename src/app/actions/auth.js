module.exports = {
  isLoggedInBool: false,

  isLoggedIn() {
    return this.isLoggedInBool
  },

  login(info, cb) {
    cb = cb || noop

    var request = require('superagent')

    request.post('localhost:3000/login', info, function (res) {
      console.log(res)
    })

    cb(res)
  },

  register(info, cb) {
    cb = cb || noop
    let res = {
      success: false,
      wrongUsername: true
    }
    // this.isLoggedInBool = true
    cb(res)
  }
}

function noop () {}
