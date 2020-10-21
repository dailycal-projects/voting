const gulp = require('gulp');

module.exports = () =>
  gulp.src('./src/data/**/*.@(js|json|csv)').pipe(gulp.dest('./dist/data/'));
