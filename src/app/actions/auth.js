module.exports = {
  isLoggedIn() {
    return !!localStorage.token
  },

  login(info, cb) {
    cb = cb || noop

    fetch('/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(function (res) {
      if(res.ok) {
        res.json().then(function (data) {
          localStorage.token = data.token
          cb(data)
        })
      } else {
        // Error; server might be down or whatever
        // Not handled yet
      }
    })

  },

  signup(info, cb) {
    cb = cb || noop

    fetch('/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(function (res) {
      if(res.ok) {
        res.json().then(function (data) {
          localStorage.token = data.token
          cb(data)
        })
      } else {
        // Error; server might be down; not handled yet
      }
    })
  },

  logout() {
    delete localStorage.token
  }
}

function noop () {}
