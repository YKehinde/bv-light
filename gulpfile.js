var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    }),
    glob = require("glob"),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gulpicon = require("gulpicon/tasks/gulpicon"),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var basePaths = {
        src: './assets/src/',
        dest: './assets/dist/'
    },
    paths = {
        images: {
            src: basePaths.src + 'img/',
            dest: basePaths.dest + 'img/'
        },
        icons: {
            src: basePaths.src + 'img/icons/',
            dest: basePaths.dest + 'img/icons/'
        },
        js: {
            src: basePaths.src + 'js/',
            dest: basePaths.dest + 'js/'
        },
        styles: {
            src: basePaths.src + 'less/',
            dest: basePaths.dest + 'css/'
        }
    };


// Gulpicon
// https://github.com/filamentgroup/gulpicon

// grab the config, tack on the output destination
var config = require("./gulp-configs/config.js");
config.dest = paths.icons.dest;
console.log("this");

// grab the file paths
var files = glob.sync(paths.icons.src + '*.svg');

// set up the gulp task
gulp.task("icons", gulpicon(files, config));

// Gulp Imagemin
gulp.task('imagemin', function() {
    return gulp.src(paths.images.src + '**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
});

// Gulp concat and uglify js
gulp.task('js', function() {
    gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe($.uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
});

// BrowserSync - local server
gulp.task('serve', ['less'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.styles.src + '**/*', ['less']).on('change', browserSync.reload);
    gulp.watch(paths.js.src + '**/*', ['js']).on('change', browserSync.reload);
    gulp.watch(paths.images.src + '**/*', ['icons', 'imagemin']);
    gulp.watch("*.html").on('change', browserSync.reload + 'waiting...');
});

// Less task to compile and minify CSS
gulp.task('less', function() {
    return gulp.src(paths.styles.src + 'bv-light.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
