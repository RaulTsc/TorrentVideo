var dest = './build',
  src    = './src'

module.exports = {

  browserSync: {
    proxy: 'http://localhost:5000',
    files: './build/**',
    port: 7000
  },

  markup: {
    src: src + "/www/**",
    dest: dest
  },

  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app.js'
    }],
    extensions: ['.jsx'],
  }
}
