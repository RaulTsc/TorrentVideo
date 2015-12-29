module.exports = {
  isLoggedInBool: false,

  isLoggedIn() {
    return this.isLoggedInBool
  },

  login(info, cb) {
    cb = cb || noop
    self = this

    $.ajax({
      url: '/login',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function (data) {
        self.isLoggedInBool = true
        cb(data)
      },
      error: function (err) {
        console.log('error')
      }
    })
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
