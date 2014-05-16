var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	coffee = require('gulp-coffee'),
	sources = {
		coffee: "src/coffee/**/*.coffee"
	},
	destinations = {
		build: ""
	};
/*BUILD COFFEE*/
gulp.task('coffee:build', function(event) {
	return gulp.src(sources.coffee)
		.pipe(plumber())
		.pipe(coffee({
			bare:true
		}))
		.pipe(gulp.dest(destinations.build));
});
/*WATCH COFFEE*/
gulp.task('coffee:watch', function(event) {
	gulp.watch(sources.coffee, ["coffee:build"]);
});
/*DEV TASK*/
gulp.task('dev', ['coffee:watch']);
/*DEFAULT TASK*/
gulp.task('default', ["dev"]);