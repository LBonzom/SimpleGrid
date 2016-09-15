var gulp = require('gulp'), sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    bulkSass = require('gulp-sass-bulk-import');

var input = './', output = './dist/',
    sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'},
    autoprefixerOptions = {browsers: ['last 2 versions', '> 5%', 'Firefox ESR']};

gulp.task('sass', function () {
    return gulp
        .src(input+'css/**/*.scss')
        .pipe(bulkSass())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(output+'css'));
});

gulp.task('font', function () {
    return gulp
        .src(input+'css/base/glyphicon/fonts/*/**')
        .pipe(gulp.dest(output+'fonts'));
});

gulp.task('watch', function () {
    return gulp
        .watch(input, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass','font', 'watch'], function () {

});