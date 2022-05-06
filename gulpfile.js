const gulp = require("gulp");
const ts = require("gulp-typescript");
const project = ts.createProject("tsconfig.json");
const pathResolver = require("gulp-typescript-path-resolver");
const livereload = require("gulp-livereload");

gulp.task("build:app", () => {
  return project
    .src()
    .pipe(project())
    .js.pipe(pathResolver.tsPathResolver(project.config.compilerOptions))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  livereload.listen();
  gulp.watch("**/*.ts", gulp.series(["build:app"]));
});

gulp.task("default", gulp.parallel(["build:app"]));
