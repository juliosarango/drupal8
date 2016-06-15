var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');




gulp.task('imagemin', function () {
    return gulp.src('./themes/drupal8_zymphonies_theme/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./themes/drupal8_zymphonies_theme/images'));
});


gulp.task('sass', function () {
  gulp.src('./themes/drupal8_zymphonies_theme/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/drupal8_zymphonies_theme/css'));
});


gulp.task('uglify', function() {
  gulp.src('./themes/drupal8_zymphonies_theme/lib/*.js')
    .pipe(uglify('custom.js'))
    .pipe(gulp.dest('./themes/drupal8_zymphonies_theme/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./themes/drupal8_zymphonies_theme/sass/**/*.scss', ['sass']);
    gulp.watch('./themes/drupal8_zymphonies_theme/lib/*.js', ['uglify']);
    gulp.watch(['./themes/drupal8_zymphonies_theme/css/custom-style.css', './themes/drupal8_zymphonies_theme/**/*.twig', './themes/drupal8_zymphonies_theme/js/*.js'], function (files){
        livereload.changed(files)
    });
});
