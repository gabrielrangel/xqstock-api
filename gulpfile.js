const gulp = require("gulp");
const ts = require("gulp-typescript");
const project = ts.createProject("tsconfig.json");
const pathResolver = require("gulp-typescript-path-resolver");
const livereload = require("gulp-livereload");
const nodemon = require("gulp-nodemon");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

gulp.task("build:app", () => {
  return project
    .src()
    .pipe(project())
    .js.pipe(pathResolver.tsPathResolver(project.config.compilerOptions, {}))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  livereload.listen();

  gulp.watch(["**/*.ts", "!dist/**/*"], gulp.series(["build:app"]));
});

gulp.task("nodemon", () => {
  nodemon({
    script: "dist/server.js",
    ext: "js, ts",
    env: process.env,
    tasks: ["build:app"],
    ignore: ["dist"],
  });
});

gulp.task("server", gulp.series(["build:app", "nodemon"]));

gulp.task("default", gulp.parallel(["build:app"]));
