var gulp = require('gulp');
var jsx = require('gulp-jsx');
var plumer = require('gulp-plumber');
var supervisor = require('gulp-supervisor');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var livereload = require('gulp-livereload');

// gulp.task('jsx', function() {
//     gulp.src('src/js/**/*.js')
//         .pipe(plumer())
//         .pipe(jsx({
//             factory: 'React.createClass'
//         }))
//         .pipe(plumer())
//         .pipe(gulp.dest('public/js'));
// });

// gulp.task('browser-sync', function() {
//     browserSync.init(null, {
//         proxy: 'http://localhost:3000',
//         browser: 'google chrome',
//         port: 7000,
//     });
// });

gulp.task('bs-reload', function() {
    browserSync.reload();
});

// gulp.task('jsx-changed', function() {
//     gulp.src('src/js/**/*.js')
//         .pipe(jsx({
//             factory: 'React.createClass'
//         }))
//         .pipe(gulp.dest('public/js'));
// });

gulp.task('css-changed', function() {
    gulp.src('src/css/**/*.css')
        .pipe(plumer())
        .pipe(gulp.dest('public/css'));
});

gulp.task('node-supervisor', function() {
    supervisor('./app.js', {
        watch: ['app', 'config'],
        ignore: ['app/views','node_modules/'],
        pollInterval: 700,
        extensions: ['js'],
        debug: true
    });
});

// var customOpts = {
//     entries: './src/js/app/app.jsx',
//     extensions: ['.jsx'],
//     debug: true,
//     cache: {},
//     packageCache: {},
//     externals: {
//         'react': 'React',
//         'react-dom': 'ReactDOM'
//     }
// };
// var b = watchify(browserify(customOpts));

// // 在这里加入变换操作
// // 比如： b.transform(coffeeify);
// b.transform('babelify', {
//     presets: ['es2015', 'react']
// });

// gulp.task('browserify', bundle); // 这样你就可以运行 `gulp js` 来编译文件了
// b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
// b.on('log', gutil.log); // 输出编译日志到终端

// function bundle() {
//     return b.bundle()
//         .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//         .pipe(source('app.js'))
//         .pipe(buffer())
//         .pipe(gulp.dest('./public/js/app'))
//         .pipe(livereload({
//             start: true
//         }));
// }

// gulp.task('browserify', function() {
//     return browserify({
//             entries: './src/js/app.jsx',
//             extensions: ['.jsx'],
//             debug: true,
//             watch: true
//         })
//         .transform('babelify', { presets: ['es2015', 'react'] })
//         .bundle()
//         .pipe(source('app.js'))
//         .pipe(gulp.dest('./public/js'));
// });


gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['bs-reload']);
    //gulp.watch('src/js/**/*.jsx', ['bs-reload']);
    gulp.watch('src/css/**/*.css', ['css-changed', 'bs-reload']);
    gulp.watch('app/views/**/*.html', ['bs-reload']);
});

gulp.task('default', ['node-supervisor',  'watch']);