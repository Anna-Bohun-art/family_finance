const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("dist/js/*.js", { base: "./" })
    .pipe(
      gap.prependText(``)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("dist/index.html", { base: "./" })
    .pipe(
      gap.prependText(``)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
