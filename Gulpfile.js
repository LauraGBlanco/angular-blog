'use strict'
var gulp = require ('gulp'),
 	connect = require('gulp-connect'),
	historyApiFallback = require('connect-history-api-fallback'),
 	stylus = require('gulp-stylus'),
    nib = require('nib'),
    minify = require('gulp-minify-css'),
	rename = require('gulp-rename'),
 	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');


//Servidor de desarrollo:
gulp.task('server', function(){
	connect.server({
		root: './app',
		hostname : '0.0.0.0',
		port: 8082,
		livereload: true,
		middleware: function(connect, opt){
			return[historyApiFallback()];
		}
	})
});

//Control de código Java script
  gulp.task('jshint', function(){
	return gulp.src('./app/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
})


// Pasa los datos de stylus a CCS y recarga los cambios
gulp.task('css', function(){
	gulp.src('./app/stylesheets/main.styl')
		.pipe(stylus({use:nib()}))		
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
});




//Recarga el navegador cuando hay cambios en html
gulp.task('html', function(){
	gulp.src('./app/**/*.html')
		.pipe(connect.reload());
});

//Vigila cambios que se produzcan en el código y lanza las tareas relacionadas
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/stylesheets/main.styl'], ['css']);
	gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint'])
	//gulp.watch(['./app/scripts/main.js', './Gulpfile.js'], ['jshint'])
});


gulp.task ('default', ['server', 'watch'], function(){
	console.log('gulp funcionando');
})






