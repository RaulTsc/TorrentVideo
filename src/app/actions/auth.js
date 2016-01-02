module.exports = {
  isLoggedIn() {
    return !!localStorage.token
  },

  login(info, cb) {
    cb = cb || noop

    $.ajax({
      url: '/login',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function (data) {
        localStorage.token = data.token
        cb(data)
      }
    })
  },

  signup(info, cb) {
    cb = cb || noop

    $.ajax({
      url: '/signup',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function (data) {
        localStorage.token = data.token
        cb(data)
      }
    })
  },

  logout() {
    delete localStorage.token
  }
}

function noop () {}
