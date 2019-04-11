var gulp = require('gulp');
var build = require('./build');
var replace = require('gulp-replace');
var func = require('./helpers');

const PREG_APIURL = new RegExp(/["|'](inc\/api.*?)["|']/g);

var apiUrlCallback = function(full, part) {
  return full.replace(part, build.config.path.demo_api_url + part);
};

// Gulp task to find api path and convert to absolute url
gulp.task('apiurl', function(cb) {
  build.config.dist.forEach(function(path) {
    var output = path;
    if (path.indexOf('**') !== -1) {
      func.getDemos().forEach(function(demo) {
        output = path.replace('**', demo);
        gulp.src(output + '/**/*.js', {allowEmpty: true}).pipe(replace(PREG_APIURL, apiUrlCallback)).pipe(gulp.dest(output));
      });
    } else {
      gulp.src(output + '/**/*.js', {allowEmpty: true}).pipe(replace(PREG_APIURL, apiUrlCallback)).pipe(gulp.dest(output));
    }
  });
  cb();
});