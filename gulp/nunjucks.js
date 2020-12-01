const gulp = require('gulp')
const nunjucks = require('gulp-nunjucks')

const config = require('./config.json')

gulp.task('nunjucks', function () {
  return gulp.src(config.paths.templates + '/*.html')
    .pipe(nunjucks.precompile())
    .pipe(gulp.dest(config.paths.public + '/templates/'))
})
