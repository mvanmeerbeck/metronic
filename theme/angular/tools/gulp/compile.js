var gulp = require('gulp');
var yargs = require('yargs');
var build = require('./build');
var func = require('./helpers');
var rename = require('gulp-rename');
var rtlcss = require('gulp-rtlcss');
var glob = require('glob');
var fs = require('fs');
var pretty = require('pretty');
var sass = require('gulp-sass');
var merge = require('merge-stream');

// merge with default parameters
var args = Object.assign({
	prod: false,
	rtl: '',
	exclude: '',
	theme: '',
	demo: '',
	path: '',
}, yargs.argv);

if (args.prod !== false) {
	// force disable debug for production
	build.config.debug = false;
	build.config.compile = Object.assign(build.config.compile, {
		'jsUglify': true,
		'cssMinify': true,
		'jsSourcemaps': false,
		'cssSourcemaps': false,
	});
}

if (args.rtl !== '') {
	build.config.compile.rtl.enabled = (args.rtl === 'true');
}

if(args.demo !== '') {
	build.config.demo = args.demo;
}

gulp.task('rtl', function(cb) {
	var streams = [];
	var stream = null;
	func.objectWalkRecursive(build.build, function(val, key, userdata) {
		if (userdata.indexOf(key) === -1 && typeof val.styles !== 'undefined' && key !== 'bundle') {
			// rtl conversion in each plugins
			for (var i in val.styles) {
				if (!val.styles.hasOwnProperty(i)) {
					continue;
				}
				var toRtlFile = func.dotPath(val.styles[i]);

				// exclude scss file for now
				if (toRtlFile.indexOf('.scss') === -1) {
					stream = gulp.src(toRtlFile, {allowEmpty: true}).
						pipe(rtlcss()).
						pipe(rename({suffix: '.rtl'})).
						pipe(gulp.dest(func.pathOnly(toRtlFile)));
					streams.push(stream);

					// convert rtl for minified
					if (!(/\.min\./i).test(toRtlFile)) {
						stream = gulp.src(toRtlFile, {allowEmpty: true}).
							pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).
							pipe(rename({suffix: '.min.rtl'})).
							pipe(gulp.dest(func.pathOnly(toRtlFile)));
						streams.push(stream);
					}
				}
			}
		}
	}, build.config.compile.rtl.skip);

	return merge(streams);
});

// task to bundle js/css
gulp.task('build-bundle', function(cb) {
	// build by demo, leave demo empty to generate all demos
	if (typeof build.config.demo !== 'undefined' && build.config.demo !== '') {
		for (var demo in build.build.demo) {
			if (!build.build.demo.hasOwnProperty(demo)) {
				continue;
			}

			var splitDemos = build.config.demo.split(',').map(function(item) {
				return item.trim();
			});
			if (splitDemos.indexOf(demo) === -1) {
				delete build.build.demo[demo];
			}
		}
	}

	//exclude by demo
	if (args.exclude !== '' && typeof args.exclude === 'string') {
		var exclude = args.exclude.split(',');
		exclude.forEach(function(demo) {
			delete build.build.demo[demo];
		});
	}

	func.objectWalkRecursive(build.build, function(val, key) {
		if (val.hasOwnProperty('src')) {
			if (val.hasOwnProperty('bundle')) {
				func.bundle(val);
			}
			if (val.hasOwnProperty('output')) {
				func.output(val);
			}
		}
	});
	cb();
});

var tasks = ['clean'];
if (build.config.compile.rtl.enabled) {
	tasks.push('rtl');
}
tasks.push('build-bundle');

// entry point
gulp.task('default', gulp.series(tasks));

// html formatter
gulp.task('html-formatter', function(cb) {
	var dir = args.path;
	if (dir === '') {
		console.log('The option --path is required');
		cb();
		return;
	}
	glob(process.cwd() + '/' + dir + '/**/*.html',
			// ignore assets folder
			{
				ignore: [
					process.cwd() + '/' + dir + '/assets/**',
					process.cwd() + '/' + dir + '/src/**',
				],
			},
			function(er, files) {
				console.log(files);
				files.forEach(function(path) {
					fs.readFile(path, {encoding: 'UTF-8'}, function(err, data) {
						if (err) {
							throw err;
						}
						var formatted = pretty(data, {
							ocd: true,
							indent_size: 1,
							indent_char: '\t',
							unformatted: ['code', 'pre', 'em', 'strong'],
						});
						fs.writeFile(path, formatted, function(err) {
							if (err) {
								throw err;
							}
							console.log(path + ' formatted!');
						});
					});
				});
			});
	cb();
});