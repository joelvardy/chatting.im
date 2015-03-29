// Load plugins
var del = require('del'),
	gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	jshintStylish = require('jshint-stylish'),
	uglify = require('gulp-uglify');


// Styles
gulp.task('styles', function () {

	return sass('./public/assets/sass/app.scss')
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.on('error', function (error) {
		console.error('Error!', error);
	})
	.pipe(gulp.dest('./public/assets/minified'));

});


// JavaScript
gulp.task('scripts', function () {

	return gulp.src('public/assets/js/**/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.on('error', function (error) {
		console.log(error);
	})
	.pipe(gulp.dest('./public/assets/minified'));

});


// Clean
gulp.task('clean', function () {
	del(['./public/assets/minified/*']);
});


// Default task
gulp.task('default', ['clean'], function () {
	gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function () {
	gulp.watch('./public/assets/sass/**/*.scss', ['styles']);
	gulp.watch('./public/assets/js/**/*.js', ['scripts']);
});
