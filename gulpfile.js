var browserSync = require('browser-sync').create(),
           gulp = require('gulp'),
         stylus = require('gulp-stylus'),
         concat = require('gulp-concat'),
          babel = require("gulp-babel"),
     sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['serve']);

gulp.task('serve', function() {
  browserSync.init({
      proxy: '127.0.0.1:8000'
  });
  gulp.watch('visualizer/source/stylus/*.styl', ['stylus']);
  gulp.watch('visualizer/source/javascript/**/*.js', ['javascript']);
  gulp.watch('visualizer/templates/visualizer/*.html', ['html']);
});

gulp.task('stylus', function() {
  return gulp.src('visualizer/source/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(concat('app.styl'))
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('visualizer/static/visualizer/css/'))
    .pipe(browserSync.stream());
});

gulp.task('javascript', function() {
  return gulp.src('visualizer/source/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('visualizer/static/visualizer/javascript'))
    .pipe(browserSync.stream());
});

gulp.task('html', function(){
  return gulp.src('visualizer/**/*.html')
    .pipe(browserSync.stream());
});
