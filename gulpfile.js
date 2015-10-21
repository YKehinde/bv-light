var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    // watch = require('gulp-watch'),
    concat = require('gulp-concat');

var jsSources = [
    './assets/src/js/**/*.js'
];

// gulp.task('log', function() {
//     gutil.log('yemi is awesome');
// });



gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./assets/dist/js'))
        .pipe(uglify(compress))
        .pipe(browserSync.stream());
});

// gulp.task('watch', function () {
//     return gulp.src('./assets/src/**/*')
//         .pipe(watch('./assets/src/**/*'))
//         .pipe(gulp.dest('build'));
// });
 
// gulp.task('callback', function (cb) {
//     watch('./assets/src/**/*', function () {
//         gulp.src('./assets/src/**/*')
//             .pipe(watch('./assets/src/**/*'))
//             .on('end', cb);
//     });
// });

gulp.task('serve', ['less'], function(){
	browserSync.init({
	    server: {
	        baseDir: "./"
	    }
	});

	gulp.watch("./assets/src/less/*.less", ['less']).on('change', browserSync.reload);
	gulp.watch("./assets/src/js/**/*.js", ['js']).on('change', browserSync.reload);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('less', function() {
    return gulp.src('./assets/src/less/bv-light.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./assets/dist/css/'))
        .pipe(browserSync.stream());

        
});

gulp.task('default', ['serve']);