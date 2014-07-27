gulp       = require 'gulp'
rename     = require 'gulp-rename'
plumber    = require 'gulp-plumber'
concat     = require 'gulp-concat'
sass       = require 'gulp-ruby-sass'
shell      = require 'gulp-shell'
bowerFiles = require "gulp-bower-files"
source     = require 'vinyl-source-stream'
browserify = require 'browserify'
typescript = require 'gulp-tsc'
tsd        = require 'gulp-tsd'

gulp.task 'js', shell.task ['zsh build.zsh']
gulp.task 'ts', ->
  gulp
    .src [
      'app/domains/application.ts'
      # 'app/domains/**/*.ts'
    ]
    .pipe plumber()
    .pipe typescript
      sourcemap: true
      # outDir: './public'
      out: 'application.js'
      target: 'ES5'
      module: "CommonJS"
    .pipe gulp.dest 'public'

gulp.task 'tsd', ->
  gulp
    .src './gulp-tsd.json'
    .pipe tsd()

gulp.task 'vendor', ->
  bowerFiles()
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest('./public')

gulp.task 'css', ->
   gulp
    .src [
      './app/ui/styles/**/*.scss'
      './app/ui/styles/**/*.sass'
    ]
    .pipe plumber()
    .pipe sass sourcemap: true, sourcemapPath: 'public/main.css.map'
    .pipe gulp.dest './public'

gulp.task 'watch', ['build'], ->
  gulp.watch 'app/**/*.coffee', ['js']
  gulp.watch 'app/**/*.jade', ['js']
  gulp.watch 'app/domains/**/*.ts', ['ts']
  gulp.watch 'app/ui/styles/**/*.sass', ['css']
  gulp.watch 'bower_components/**/*.js', ['vendor']

gulp.task 'build', ['vendor', 'ts','js', 'css']
gulp.task 'default', ['build']
