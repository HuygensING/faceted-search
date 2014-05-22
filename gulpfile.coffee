gulp = require 'gulp'
stylus = require 'gulp-stylus'
concat = require 'gulp-concat'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
coffee = require 'gulp-coffee'
		
gulp.task 'stylus', ->
	gulp.src(['./src/**/*.styl'])
		.pipe(stylus())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(__dirname))

gulp.task 'coffee', ->
	gulp.src('./src/coffee/**/*')
		.pipe(coffee())
		.pipe(gulp.dest('./compiled'))

gulp.task 'watch', ->
	gulp.watch [paths.stylus], ['stylus']

gulp.task 'default', ['watch']