var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var bower = require('gulp-bower');

gulp.task('js', function(){
  browserify('./public/javascripts/src/app.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest('./bower_components')) 
});

gulp.task('watch', function() {
  gulp.watch("public/javascripts/src/**/*.jsx", ["js"])
});

gulp.task('icons', function() { 
  return gulp.src('./bower_components/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('default', ['js', 'bower', 'icons', 'watch']);
