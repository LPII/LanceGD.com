//PROJECT: VIP

// -- Var -- //

//PLUGINS//
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var wait = require("gulp-wait");
var dirSync = require("gulp-directory-sync");
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var ftp = require('vinyl-ftp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var localFilesGlob = ['./build/**'];


//PROJECTS//
var localDir = "http://localhost/Personal";
var srcDir = "./src/";
var buildDir = "./build/";
var altDir = "C:/xampp/htdocs/Personal/wp-content/themes/PersonalSite/"



// -- UTIL -- //

//Kill build dir
gulp.task('clean', function () {

    return gulp.src('./build', {
        read: false
    }) // much faster
        .pipe(wait(1000))
        .pipe(clean());

});

//Spin up local server
gulp.task('sync', function () {
    browserSync.init({
        proxy: localDir
    });

});

//Reload Browser
gulp.task('reload', function () {
    return gulp.src('')
        .pipe(wait(2000))
        .pipe(browserSync.stream());
});



// -- BASE BUILD TASKS -- //


//Compile SCSS,make-styles --> build
gulp.task('make-styles', function () {
    gulp.src(srcDir + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest( buildDir +'css/'))
        .pipe(gulp.dest( altDir +'css/'))
});

//Compile JS, make-js --> build
gulp.task('make-js', function () {

    return gulp.src([srcDir + 'js/lib/*.js', srcDir + 'js/core/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + 'js/'))
        .pipe(gulp.dest(altDir + 'js/'));

});

//Image min, make-image --> build
gulp.task('make-image', function () {
    gulp.src(srcDir + 'img/**/**')
        .pipe(imagemin())
        .pipe(gulp.dest(buildDir + 'img/'))
        .pipe(gulp.dest(altDir + 'img/'))

});

//Build everything make-rest --> build
gulp.task('make-rest', function () {
    return gulp.src('')
        .pipe(dirSync(srcDir, buildDir, {
            ignore: ['img', 'scss','css', 'js','js/**']
        }))
        .pipe(dirSync(srcDir, altDir, {
            ignore: ['img', 'scss','css', 'js','js/**']
        }));
});

//(styles, js, no image, sync rest)
gulp.task('construct', function () {
    runSequence('clean',
        'make-styles',
        'make-js',
        'make-rest');
});

//(styles, js, image, sync rest)
gulp.task('construct-all', function () {
    runSequence('clean',
        'make-styles',
        'make-js',
        'make-rest',
        'make-image');
});


//-- BUILD EXTENSION --//


//FTP
gulp.task('ftp', function () {
    //Connection info obejct
    var conn = ftp.create({
        host: 'lancegd.com',
        user: 'admin@lancegd.com',
        password: '%Cr6d>P2',
        parallel: 10,
        log: ''
    });
    var remoteFolder = '/MMdev/wp-content/themes/MMK';

    //Keep it simple and just upload build folder, worry about keeping build clean with other task
    return gulp.src(localFilesGlob, {base: 'build', buffer: false})
        .pipe(wait(500))
        .pipe(conn.newer(remoteFolder))
        .pipe(conn.dest(remoteFolder));
});

//Send to dev destingation
gulp.task('to-dev', function () {
    return gulp.src('')
        .pipe(dirSync(buildDir, 'C:/xampp/htdocs/DEV/VIP/wp-content/themes/VIP-homes', {}));
});
gulp.task('to-dev-reload', function () {
    runSequence('to-dev',
        'reload');
});

//-- WATCHERS --//
gulp.task('watch', function () {
    //Source
    gulp.watch(['./src/*.php'], ['make-rest','reload']);
    gulp.watch(['./src/scss/*.scss', './src/scss/*/*.scss'], ['make-styles','reload']);
    gulp.watch(['./src/js/**/*.js'], ['make-js','reload']);
    gulp.watch(['./src/img/**'], ['make-rest','reload']);
});


// -- Default -- //
gulp.task('local', ['clean','construct', 'sync', 'watch']);
gulp.task('remote', ['build', 'watch-remote']);
gulp.task('serve', ['sync', 'watch']);