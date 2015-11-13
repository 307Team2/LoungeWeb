var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var errorAlert = function(error) {
  notify.onError({message: error.message})(error); //Error Notification
  console.log(error.toString());//Prints Error to Console
  this.emit("end"); //End function
};

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(['./sass/base.scss', './bower_components/bootstrap-sass/assets/stylesheets/_bootstrap'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', errorAlert))
    .pipe(sourcemaps.write({sourceRoot: '../'}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('js', function(){
  browserify('./public/javascripts/src/app.jsx')
    .transform(reactify)
    .transform(envify({
      API_ROOT: process.env.NODE_ENV === 'production' ? 'http://lounge-api.herokuapp.com' : 'http://localhost:3000'
    }))
    .bundle()
    .on('error', errorAlert)
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('bower', function() { 
  return bower()
    .on('error', errorAlert)
    .pipe(gulp.dest('./bower_components')) 
});

gulp.task('watch', function() {
  gulp.watch("public/javascripts/src/**/*.jsx", ["js"]);
  gulp.watch("public/javascripts/src/**/*.js", ["js"]);
  gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task('icons', function() { 
  return gulp.src('./bower_components/font-awesome/fonts/**.*') 
    .on('error', errorAlert)
    .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('build', ['js', 'bower', 'sass', 'icons']);
gulp.task('default', ['build', 'watch']);
