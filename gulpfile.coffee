gulp       = require 'gulp'
rename     = require 'gulp-rename'
plumber    = require 'gulp-plumber'
concat     = require 'gulp-concat'
sass       = require 'gulp-ruby-sass'
shell      = require 'gulp-shell'
bowerFiles = require "gulp-bower-files"
source     = require 'vinyl-source-stream'
browserify = require 'browserify'

gulp.task 'js', shell.task ['zsh build.zsh']

gulp.task 'vendor', ->
  bowerFiles()
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest('./public')

gulp.task 'css', ->
   gulp
    .src './app/ui/styles/*.sass'
    .pipe plumber()
    .pipe sass sourcemap: true, sourcemapPath: 'public/main.css.map'
    .pipe gulp.dest './public'

gulp.task 'watch', ['build'], ->
  gulp.watch 'app/**/*.coffee', ['js']
  gulp.watch 'app/**/*.jade', ['js']
  gulp.watch 'app/ui/styles/**/*.sass', ['css']
  gulp.watch 'bower_components/**/*.js', ['vendor']

gulp.task 'build', ['vendor', 'js', 'css']
gulp.task 'default', ['build']
