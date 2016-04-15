var gulp = require('gulp');
var jsx = require('gulp-jsx');
var changed = require('gulp-changed');
var plumer = require('gulp-plumber');
var supervisor = require('gulp-supervisor');
var browserSync = require('browser-sync');
var livereload = require('gulp-livereload');

gulp.task('jsx', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jsx({
            factory: 'React.createClass'
        }))
        .pipe(plumer())
        .pipe(gulp.dest('public/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['public/**/*.*','app/views/**/*.*'],
        browser: 'google chrome',
        port: 7000,
    });
});

gulp.task('jsx-changed', function() {
    gulp.src('src/js/**/*.js')
        .pipe(changed('public/js'))
        .pipe(jsx({
            factory: 'React.createClass'
        }))
        .pipe(plumer())
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
        // ignore:['app/views'],
        pollInterval: 700,
        extensions: ['js'],
        debug: true
    });
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('src/js/**/*.js', function() {
        gulp.run('jsx-changed');
    });

    gulp.watch('src/css/**/*.css', function() {
        gulp.run('css-changed');
    });

    gulp.watch('app/views/**/*.*', function() {
    });
     gulp.watch('public/js/**/*.js', function() {
    });

});

gulp.task('default', ['jsx', 'node-supervisor','browser-sync', 'watch']);
