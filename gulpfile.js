var gulp=require('gulp'),
	sass=require('gulp-sass'),
	browserSync=require('browser-sync').create(),
	babel=require('gulp-babel'),
	spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
	gulp.src('src/images/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprites.scss',
		cssFormat:'scss'
	}))
	.pipe(gulp.dest('./dist/images/sprite/'));
});

gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: "./dist/"
    });
});

gulp.task('watch',function(){
	gulp.watch('./src/scss/*.scss',['sass']);
	gulp.watch('./src/js/*.js',['build']);
	gulp.watch('./dist/js/*.js').on('change',browserSync.reload);
	gulp.watch('./dist/*.html').on('change',browserSync.reload);
})

gulp.task('sass',function(){
	gulp.src('./src/scss/*.scss')
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream());
})

gulp.task('build',function(){
	gulp.src('./src/js/app.js')
	.pipe(babel({
		presets:['env']
	})).on('error',console.error.bind(console))
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.stream());
})

gulp.task('default', ['server','watch','build']);