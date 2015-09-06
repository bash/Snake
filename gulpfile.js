/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

/**
 * TASK: build
 */
gulp.task('build', function () {
    var source = gulp.src("src/index.js"),
        target = gulp.dest("dist/");

    return source.pipe(browserify({
        global: false,
        transform: [ 'babelify'] //, 'uglifyify']
    })).pipe(target);
});