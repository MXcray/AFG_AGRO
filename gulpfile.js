let preprocessor = 'scss'; // Определяем переменную "preprocessor"

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync 							 = require('browser-sync').create();
const concat 								 = require('gulp-concat');
const uglify 								 = require('gulp-uglify-es').default;
const sass 									 = require('gulp-sass')(require('sass'));
const less 									 = require('gulp-less');
const autoprefixer 							 = require('gulp-autoprefixer');
const cleancss 								 = require('gulp-clean-css');
const imagecomp 							 = require('compress-images');
const clean 								 = require('gulp-clean');

function browsersync() {
	browserSync.init({ 
		server: { baseDir: 'app/' }, 
		notify: false, 
		online: true 
	})
}

function fonts() {
    return src('app/fonts/**/*')
    .pipe(dest('dist/fonts'))
}

function scripts() {
	return src([ // сначала библиотеки
		'node_modules/jquery/dist/jquery.min.js', 
		'node_modules/slick-carousel/slick/slick.min.js',
        'app/js/app.js', 
        'app/js/sliders.js',
		])
	.pipe(concat('app.min.js')) 
	.pipe(uglify()) 
	.pipe(dest('app/js/')) 
	.pipe(browserSync.stream()) 
}

function styles() {
	return src('app/' + preprocessor + '/main.' + preprocessor + '') 
	.pipe(sass()) 
	.pipe(concat('app.min.css')) 
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) 
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) 
	.pipe(dest('app/css/')) 
	.pipe(browserSync.stream())
}

async function images() {
	imagecomp(
		"app/images/src/**/*", // Откудка
		"app/images/dest/",    // Куда
		{ compress_force: false, statistic: true, autoupdate: true }, false, 
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, 
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function cleanimg() {
	return src('app/images/dest/', {allowEmpty: true}).pipe(clean()) // Удаляем всё содержимое папки "app/images/dest/"
}

function buildcopy() {
	return src([ // Выбираем нужные файлы
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/**/*.html',
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}
 
function cleandist() {
	return src('dist', {allowEmpty: true}).pipe(clean()) // Удаляем всё содержимое папки "dist"
}

function startwatch() {
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts); // Выбор всех файлов JS в проекте, .min.js исключаю
	watch('app/**/' + preprocessor + '/**/*', styles); // Мониторим файлы препроцессора на изменения
	watch('app/**/*.html').on('change', browserSync.reload); // Мониторим файлы HTML на изменения
	watch('app/images/src/**/*', images);	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
 
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.fonts = fonts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;

exports.build = series(cleandist, fonts, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);