// Load plugins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	rimraf = require('gulp-rimraf'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglifyjs');

// SASS
gulp.task('styles', function () {
	return gulp.src('public/assets/sass/app.scss')
	.pipe(sass({
		sourcemap: true,
		style: 'compressed'
	}))
	.on('error', notify.onError(function (error) {
		return error.message;
	}))
	.pipe(gulp.dest('public/assets/css'))
	.pipe(notify({
		title: 'Styles',
		message: 'Task complete'
	}));
});

// JavaScript
gulp.task('scripts', function () {
	return gulp.src('public/assets/scripts/**/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/assets/js'))
	.pipe(uglify({
		outSourceMap: true
	}))
	.pipe(gulp.dest('public/assets/js'))
	.pipe(notify({
		title: 'Scripts',
		message: 'Task complete'
	}));
});

// Clean
gulp.task('clean', function() {
	return gulp.src(['public/assets/css', 'public/assets/js'], {
		read: false
	})
	.pipe(rimraf());
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {
	gulp.watch('public/assets/sass/**/*.scss', ['styles']);
	gulp.watch('public/assets/scripts/**/*.js', ['scripts']);
});
