// -- Var -- //

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var wait = require("gulp-wait");
var dirSync = require('gulp-directory-sync');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// -- Tasks -- //

//Compile SCSS
gulp.task('styles', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./src/css/'))
    //  .pipe(wait(2000))
    //      .pipe(browserSync.stream());

});
//Make build 
gulp.task('build', function () {
    return gulp.src('')
        .pipe(dirSync('./src', './build', {
            ignore: ['img', 'scss']
        }));
});
//Image min
gulp.task('image', function () {
    gulp.src('./src/img/**/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'))

});
//Spin up local server
gulp.task('sync', function () {
    browserSync.init({
        proxy: "http://localhost/DEV/LGD_dev"
    });
});
//Reload Browser
gulp.task('reload', function () {
    return gulp.src('')
        .pipe(dirSync('./src', './build', {
            ignore: function (dir, file) {
                return file === 'scss';
            }
        }))
        .pipe(wait(1100))
        .pipe(browserSync.stream());

});
//Watcher task
gulp.task('watch', function () {
    gulp.watch(['./src/scss/*.scss', 'scss/*/*.scss'], ['styles']);
    gulp.watch(['./src/css/*.css'], ['reload']);
    gulp.watch(['./src/img/**'], ['image']);
    gulp.watch(['./src/js/*.js'], ['reload']);
    gulp.watch(['./src/*.php'], ['reload']);

});

// -- Default -- //
gulp.task('default', ['styles', 'build', 'image', 'sync', 'watch']);