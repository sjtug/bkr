var gulp = require('gulp');
var bower = require('gulp-bower');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var broswerify = require('gulp-browserify');

var paths = {
  stylus: './app/stylus/**/*.styl',
  js: './app/javascript/app.js'
};

gulp.task('default', ['stylus', 'js']);


gulp.task('bower', function(done) {
  return bower().pipe('./www/lib/').on('end', done);
})

gulp.task('stylus', function(done) {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src(paths.js)
    .pipe(broswerify({
      insertGlobals : true,
      debug : !process.env.PRODUCTION
    }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);
});

gulp.task('serve', function(done) {
  var connect = require('connect'), server = connect();
  server.use(connect.static('./www/')).listen(process.env.PORT || 8080, done);
});

gulp.task('watch', function() {
  gulp.watch([paths.stylus], ['stylus']);
  gulp.watch([paths.js], ['js']);
  gulp.run('serve')
});
