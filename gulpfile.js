var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src('./sass/base.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('js', function(){
  browserify('./public/javascripts/src/app.jsx')
    .transform(reactify)
    .transform(envify({
      API_ROOT: process.env.NODE_ENV === 'production' ? 'http://lounge-.herokuapp.com' : 'http://localhost:3000'
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest('./bower_components')) 
});

gulp.task('watch', function() {
  gulp.watch("public/javascripts/src/**/*.jsx", ["js"]);
  gulp.watch("public/javascripts/src/**/*.js", ["js"]);
  gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task('icons', function() { 
  return gulp.src('./bower_components/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('default', ['js', 'sass', 'bower', 'icons', 'watch']);
gulp.task('build', ['js', 'sass', 'bower', 'icons']);
