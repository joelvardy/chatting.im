var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('scss', function () {
    gulp.src('./scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public'));
});
