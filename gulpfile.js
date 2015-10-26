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
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cached'),
    autoprefixer = require('gulp-autoprefixer'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    gulpicon = require("gulpicon/tasks/gulpicon"),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
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
            src: basePaths.src + ['js/'],
            dest: basePaths.dest + ['js/']
        },
        styles: {
            src: basePaths.src + 'less/',
            dest: basePaths.dest + 'css/'
        }
    };

// Gulpicon
// https://github.com/filamentgroup/gulpicon

// grab the config, tack on the output destination
var config = require("./gulp-configs/grunticon/config.js");
config.dest = paths.icons.dest;
console.log("this");

// grab the file paths
var files = glob.sync(paths.icons.src + '*.svg');

// set up the gulp task
gulp.task('icons', ['imagemin', 'grunticon']);

// Gulp Imagemin
gulp.task('imagemin', function() {
    return gulp.src(paths.images.src + '**/*.{png,jpg,gif}')
        .pipe(clean())
        .pipe(newer(paths.images.dest))
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [
	{ removeXMLProcInst: false }, // keep XML declaration to avoid errors creating PNG on Win 7
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs : true },
                    { removeUnknownsAndDefaults : true}
            ],
            use: [mozjpeg(), pngquant()]
        })))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
        _initGrunticon();
});

gulp.task('grunticon', function(){

    var svgFiles = glob.sync(paths.icons.src + '**/*.svg');
    var grunticon = gulpicon(svgFiles, config);

    grunticon();
})

// Copy files over
gulp.task('copy-files', function() {
   gulp.src('./assets/src/js/libs/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('./assets/dist/js/libs'));
});

// Gulp concat and uglify js
gulp.task('js', function() {
	gulp.src('./assets/src/js/libs/*.js')
	   .pipe(uglify())	   
       .pipe(gulp.dest('./assets/dist/js/libs'));
    return gulp.src([
    	'./node_modules/jquery/src',
    	paths.js.src + 'helpers/console.js',
    	paths.js.src + '*.js'
    	])
        .pipe(sourcemaps.init())
        .pipe(uglify('script.min.js', 
        {
        	compress: true,
        	outSourceMap: true
        	// beautify: true
        }))
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest));
        // .pipe(browserSync.stream());
});

// Less task to compile and minify CSS
gulp.task('less', function() {
    return gulp.src(paths.styles.src + 'bv-light.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
});

//Styleguide
gulp.task('styleguide', function() {
    return gulp.src(paths.styles.src + 'styleguide.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/dist/'))
        // .pipe(browserSync.stream());
})

// BrowserSync - local server
gulp.task('serve', ['less', 'js', 'icons', 'copy-files'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.styles.src + '**/*', ['less']).on('change', browserSync.reload);
    gulp.watch(paths.js.src + '**/*', ['js']).on('change', browserSync.reload);
    gulp.watch(paths.images.src + '**/*', ['imagemin']);
    gulp.watch(paths.icons.src + '**/*', ['icons']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
