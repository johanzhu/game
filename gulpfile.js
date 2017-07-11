
var gulp = require('gulp');

var jsonminify = require('gulp-jsonminify');

var cleanCSS = require('gulp-clean-css');

var	gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');
    
    
 
gulp.task('minify', function () {
    return gulp.src(['gamescene/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/'));
});


gulp.task('minify-css', () => {
  return gulp.src(['css/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'));
});


gulp.task('js-fef', function(){
    return gulp.src(['three.js'])
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('three.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'));
});