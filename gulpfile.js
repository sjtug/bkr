var path = require('path');
var stream = require('stream');

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

var mold = require('mold-source-map');
var browserify = require('browserify');
var source = require('vinyl-source-stream')

var paths = {
  resources: ['./app/index.html', './app/templates/**/*.html', './app/images/**/*', './app/lib/**/*'],
  stylus: './app/stylus/**/*.styl',
  js: './app/javascript/app.js'
};

var lib_src = {
  './bower_components/framework7/dist/css/': ['framework7.min.css'],
  './bower_components/framework7/dist/js/': ['framework7.min.js'],
  './bower_components/': ['ionicons/fonts/*', 'ionicons/css/ionicons.min.css'],
  './app/lib/': ['*']
}

var transformTemplate = function(filepath, file, i, length) {
  var writable = new stream.Writable();
  var contents = ''
  writable._write = function(data) {contents+=data};
  file.pipe(writable, {end: false});

  var rp = file.relative.toLowerCase();
  rp = rp.replace(/\.html$/, '');
  rp = rp.replace(/[\W_]+/g, '-');
  rp = rp.replace(/(^-|-$)/g, '');
  return '\n<script type="text/template" id="tmpl-' + rp + '">\n' + contents + '\n</script>';
}

gulp.task('resources', function(done) {
  for (var base in lib_src) {
    var src = lib_src[base];
    var files = []
    for (var i in src) {
      var file = src[i];
      files.push(path.join(base, file));
    }
    gulp.src(files, {base: base}).pipe(gulp.dest('./www/lib/'));
  } 
  setTimeout(function(){
    gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/templates/**/*.html'), {transform: transformTemplate}))
    .pipe(gulp.dest('./www/'));
    gulp.src('./app/images/**/*').pipe(gulp.dest('./www/images/')).on('end', done);
  }, files.length * 10);
});

gulp.task('stylus', function(done) {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('js', function(done) {
browserify()
  .require('./bower_components/underscore/underscore.js', {expose: 'underscore'})
  .require('./bower_components/backbone/backbone.js', {expose: 'backbone'})
  .require('./bower_components/jquery/dist/jquery.js', {expose: 'jquery'})
  .require('./app/javascript/init.js', { entry: true })
  .bundle({ debug: true })
  .pipe(mold.transform(
    function mapFileUrlComment(sourcemap, cb) {
    sourcemap.sourceRoot('file://');
    cb(sourcemap.toComment());
  }))
  .pipe(source('app.js'))
  .pipe(gulp.dest('./www/js/'))
  .on('end', done);
});

gulp.task('serve', function(done) {
  var connect = require('connect'), server = connect();
  server.use(connect.static('./www/')).listen(process.env.PORT || 8080, done);
});

gulp.task('watch', function() {
  gulp.watch(paths.resources, ['resources']);
  gulp.watch(['./app/javascript/**/*.js'], ['js']);
  gulp.watch([paths.stylus], ['stylus']);
});

gulp.task('default', ['resources', 'stylus', 'js', 'serve', 'watch']);
