var browserSync = require('browser-sync').create(),
           gulp = require('gulp'),
         stylus = require('gulp-stylus'),
         concat = require('gulp-concat'),
          babel = require("gulp-babel"),
     sourcemaps = require('gulp-sourcemaps'),
     modRewrite = require('connect-modrewrite');

gulp.task('default', ['stylus', 'javascript', 'partials', 'index', 'serve']);

gulp.task('serve', function() {
  browserSync.init({
      server: {
        baseDir: './dist',
        middleware: [
          modRewrite([
            '!\\.\\w+$ /index.html [L]'
          ])
        ]
      }
  });
  gulp.watch('src/stylus/*.styl', ['stylus']);
  gulp.watch('src/javascript/**/*.js', ['javascript']);
  gulp.watch('src/partials/*.html', ['partials']);
  gulp.watch('src/index.html', ['index']);
});

gulp.task('stylus', function() {
  return gulp.src('src/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(concat('app.styl'))
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('javascript', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/javascript'))
    .pipe(browserSync.stream());
});

gulp.task('partials', function(){
  return gulp.src('src/partials/*.html')
    .pipe(gulp.dest('dist/partials'))
    .pipe(browserSync.stream());
});

gulp.task('index', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
})
