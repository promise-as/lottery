var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const open = require('open');

gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(livereload());
});

gulp.task('css', function() {
  return gulp.src('src/sass/*.scss')
  .pipe(sass(
    {outputStyle: 'compact'}
  ).on('error', sass.logError))
  .pipe(autoprefixer(
    ['last 2 versions', 'Android >= 4.0'], { cascade: true })
  )
  // 嵌套输出方式 nested
  // 展开输出方式 expanded 
  // 紧凑输出方式 compact 
  // 压缩输出方式 compressed
  .pipe(gulp.dest('dist/css/'))
  .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/js'))
  .pipe(livereload());
});

gulp.task('default', ['html', 'css', 'js'], function() {
  livereload.listen();
  connect.server({
    root: 'dist',
    port: 5000,
    host: '192.168.30.76',
    livereload: true
  });
  open('http://192.168.30.76:5000');
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('src/sass/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
});
