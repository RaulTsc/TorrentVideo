module.exports = {
  isLoggedIn() {
    return !!localStorage.token
  },

  login(info, cb) {
    cb = cb || noop
    const self = this

    $.ajax({
      url: '/login',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function (data) {
        localStorage.token = data.token
        cb(data)
      },
      error: function (err) {
        console.log('Error', err)
      }
    })
  },

  register(info, cb) {
    cb = cb || noop
    const self = this

    $.ajax({
      url: '/signup',
      dataType: 'json',
      type: 'POST',
      data: info,
      success: function (data) {
        localStorage.token = data.token
        cb(data)
      },
      error: function (err) {
        console.log('Error', err)
      }
    })
  },

  logout() {
    delete localStorage.token
  }
}

function noop () {}
