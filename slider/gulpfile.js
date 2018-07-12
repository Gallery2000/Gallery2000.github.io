var gulp = require('gulp');
var rev = require('gulp-rev'); //生产版本号
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref'); //合并js和css
var filter = require('gulp-filter');//利用restore返回流
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css
 
gulp.task('default', function () { 
 
 
    var jsFilter = filter('**/*.js', {restore: true });
    var cssFilter = filter('**/*.css', {restore: true });
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true })
 
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
})