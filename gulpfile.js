var browserSync = require('browser-sync').create(),
           gulp = require('gulp'),
         stylus = require('gulp-stylus'),
         concat = require('gulp-concat');

gulp.task('serve', function() {
  browserSync.init({
      proxy: '127.0.0.1:8000'
  });
  gulp.watch('visualizer/source/visualizer/stylus/*.styl', ['stylus']);
  gulp.watch('visualizer/source/visualizer/javascript/*.js', ['javascript']);
});

gulp.task('stylus', function() {
  gulp.src('visualizer/source/visualizer/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('visualizer/static/visualizer/css'))
    .pipe(browserSync.stream());
});

gulp.task('javascript', function() {
  gulp.src('visualizer/source/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('visualizer/static/visualizer/javascript'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
