var gulp = require('gulp'),
	rigger = require('gulp-rigger'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	prefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var path = {

	build: {
		html: 'build/',
		js: 'build/js',
		style: 'build/style',
		img: 'build/img'
	},

	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*'
	},
	clean: './build'
}

var config = {
    server: {
        baseDir: "build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html:build', function (done) {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
		done();
});

gulp.task('js:build', function (done) {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
		done();
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		return gulp.src('src/style/main.scss')
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest(path.build.style))
		.pipe(reload({stream: true}));
		
});

gulp.task('image:build', function (done) {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
        done();
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('build', gulp.parallel(
	'html:build',
	'js:build',
	'style:build',
	'image:build'
));

gulp.task('default', gulp.series('build', 'webserver', 'watch'));