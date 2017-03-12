var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var wait = require("gulp-wait");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('styles', function () {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
    .pipe(rename('style.css'))
        .pipe(gulp.dest('./css/'))
         .pipe(wait(2000))
             .pipe(browserSync.stream());
      
});

gulp.task('phpReload', function () {
    gulp.src('./*.php')
     .pipe(wait(1100))
             .pipe(browserSync.stream());
      
});

gulp.task('jsReload', function () {
    gulp.src('./*.js')
     .pipe(wait(1100))
             .pipe(browserSync.stream());
      
});



// gulp.task('js', function() {
//     gulp.src('js/*.js')
//  uglify()
//       .pipe(gulp.dest('./js/dist/main-dist.js'))
//               .pipe(browserSync.stream());
// });


gulp.task('sync', function () {
    browserSync.init({
        proxy: "http://localhost/DEV/LGD_dev"
    });
});

gulp.task('watch', function () {
    gulp.watch(['scss/*.scss', 'scss/*/*.scss'], ['styles']);
    gulp.watch(['css/*.css'], reload);
    gulp.watch(['js/*.js'], ['jsReload']);
    gulp.watch(['*.php'], ['phpReload']);

});



// gulp.task('js', function() {
//     gulp.src('scss/*.scss')
//         .pipe(sass().on('error', sass.logError))
//           .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest('./css/'))
// });

//Watch task
gulp.task('default', ['styles', 'sync', 'watch']);