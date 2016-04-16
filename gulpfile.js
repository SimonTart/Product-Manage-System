var gulp = require('gulp');
var jsx = require('gulp-jsx');
var plumer = require('gulp-plumber');
var supervisor = require('gulp-supervisor');
var browserSync = require('browser-sync');

gulp.task('jsx', function() {
    gulp.src('src/js/**/*.js')
        .pipe(plumer())
        .pipe(jsx({
            factory: 'React.createClass'
        }))
        .pipe(plumer())
        .pipe(gulp.dest('public/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        browser: 'google chrome',
        port: 7000,
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('jsx-changed', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jsx({
            factory: 'React.createClass'
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css-changed', function() {
    gulp.src('src/css/**/*.css')
        .pipe(plumer())
        .pipe(gulp.dest('public/css'));
});

gulp.task('node-supervisor', function() {
    supervisor('./app.js', {
        watch: ['app', 'config'],
        ignore: ['app/views'],
        pollInterval: 700,
        extensions: ['js'],
        debug: true
    });
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['jsx-changed', 'bs-reload']);
    gulp.watch('src/css/**/*.css', ['css-changed', 'bs-reload']);
     gulp.watch('app/views/**/*..html', ['bs-reload']);
});

gulp.task('default', ['jsx', 'node-supervisor', 'browser-sync', 'watch']);
