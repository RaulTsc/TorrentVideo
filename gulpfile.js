var gulp       = require('gulp'),
  browserSync  = require('browser-sync'),
  reload       = browserSync.reload,
  nodemon      = require('gulp-nodemon'),
  browserify   = require('browserify'),
  watchify     = require('watchify'),
  source       = require('vinyl-source-stream'),
  babelify     = require('babelify'),
  config       = require('./gulp/config'),
  bundleLogger = require('./gulp/util/bundleLogger'),
  handleErrors = require('./gulp/util/handleErrors')

gulp.task('default', ['watch'])

gulp.task('watch', ['setWatch', 'browserSync'], function () {
  gulp.watch(config.markup.src, ['markup'])
})

gulp.task('setWatch', function () {
  global.isWatching = true
})

gulp.task('browserSync', ['build', 'nodemon'], function () {
  browserSync.init(null, config.browserSync)
})

gulp.task('nodemon', function (cb) {
  var called = false
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true
      cb()
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false })
    }, 1000)
  })
})

gulp.task('build', ['browserify', 'markup'])

gulp.task('markup', function () {
  return gulp.src(config.markup.src).pipe(gulp.dest(config.markup.dest))
})

// Browserify voodoo
gulp.task('browserify', function(callback) {

  var bundleQueue = config.browserify.bundleConfigs.length

  var browserifyThis = function(bundleConfig) {

    var bundler = browserify({
      // Required watchify args
      cache: {}, packageCache: {}, fullPaths: false,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Add file extentions to make optional in your requires
      extensions: config.browserify.extensions,
      // Enable source maps!
      debug: config.browserify.debug
    });

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName)

      return bundler
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished)
    };

    bundler.transform(babelify.configure({stage: 1}))

    if (global.isWatching) {
      // Wrap with watchify and rebundle on changes
      bundler = watchify(bundler)
      // Rebundle on update
      bundler.on('update', bundle)
    }

    var reportFinished = function() {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName)

      if (bundleQueue) {
        bundleQueue--
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback()
        }
      }
    }

    return bundle()
  }

  // Start bundling with Browserify for each bundleConfig specified
  config.browserify.bundleConfigs.forEach(browserifyThis)
})
