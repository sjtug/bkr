var stream = require('stream');
var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var browserify = require('browserify');
var mold = require('mold-source-map');

var paths = {
  resources: ['./app/index.html', './app/templates/**/*.html', './app/images/**/*'],
  stylus: './app/stylus/**/*.styl',
  js: './app/javascript/app.js'
};

var bower_src = {
  './bower_components/framework7/dist/css/': ['framework7.min.css'],
  './bower_components/': ['ionicons/font/*', 'ionicons/css/ionicons.min.css'],
}

var js_lib = {
  framework7: {
    path: './bower_components/framework7/dist/js/framework7.js',
    exports: 'Framework7'
  },
  underscore: {
    path: './bower_components/underscore/underscore.js',
    exports: 'this'
  },
  backbone: {
    path: './bower_components/backbone/backbone.js',
    exports: 'this'
  }
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
  return '\n<script type="text/template" id="' + rp + '">\n' + contents + '\n</script>';
}

gulp.task('resources', function(done) {
  for (var base in bower_src) {
    var src = bower_src[base];
    var files = []
    for (var i in src) {
      var file = src[i];
      files.push(path.join(base, file));
    }
    gulp.src(files, {base: base}).pipe(gulp.dest('./www/lib/'));
  } 
  gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/templates/**/*.html'), {transform: transformTemplate}))
    .pipe(gulp.dest('./www/'));
  gulp.src('./app/images/**/*').pipe(gulp.dest('./www/images/')).on('end', done);
});

gulp.task('stylus', function(done) {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});



gulp.task('js', function(done) {
browserify()
  .require(require.resolve('./app/javascript/app.js'), { entry: true })
  .bundle({ debug: true })
  .pipe(mold.transform(
    function mapFileUrlComment(sourcemap, cb) {
    fs.writeFile('./www/js/app.js.map', sourcemap.toJSON(2), 'utf-8', function (err) {
      if (err) return console.error(err);
      cb('//@ sourceMappingURL=' + path.basename('./www/js/app.js.map'));
    });
  }))
  .pipe(fs.createWriteStream('./www/js/app.js'));
});

gulp.task('serve', function(done) {
  var connect = require('connect'), server = connect();
  server.use(connect.static('./www/')).listen(process.env.PORT || 8080, done);
});

gulp.task('watch', function() {
  gulp.watch(paths.resources, ['resources']);
  gulp.watch([paths.stylus], ['stylus']);
  gulp.watch([paths.js], ['js']);
});

gulp.task('default', ['resources', 'stylus', 'js', 'serve', 'watch']);
