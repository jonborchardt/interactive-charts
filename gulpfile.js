'use strict';

var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat-util');
var cleanCss = require('gulp-clean-css');
var config = require('./gulp.config.js')();
var del = require('del');
var path = require('path');
var pkg = require('./package.json');
var moduleName = pkg.name.split("-").join(".");
var $ = require('gulp-load-plugins')({
    lazy: true
});

var verbose = false,
    // -----------------------------------------------
	// Logs files processed if verbose is set.
    // -----------------------------------------------
	logFiles = function (msg, files) {
	    if (verbose) {
	        console.log(msg + ":\n", files);
	    } else if (Array.isArray(files) && (files.length > 0)) {
	        console.log(msg + ": ", files.length);
	    }
	},
    // -----------------------------------------------
    // Log child process output
    // -----------------------------------------------
    logChildProcessOutput = function (process, doneCallback) {
        function logOutput(output) {
            var lines = output.split(/\r?\n/);
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if (line.indexOf("error") >= 0 || line.indexOf("FAILED") >= 0 || line.indexOf("ERROR") >= 0) {
                    $.util.log("[Child process]", $.util.colors.red(line));
                } else if (line.indexOf("warn") >= 0 || line.indexOf("PASS") >= 0 || line.indexOf("SUCCESS") >= 0) {
                    $.util.log("[Child process]", $.util.colors.yellow(line));
                } else if (line.length > 0) {
                    $.util.log("[Child process]", $.util.colors.gray(line));
                }
            }
        }

        process.stdout.on('data', logOutput);
        process.stderr.on('data', logOutput);
        process.on('exit', function (code) {
            if (code == 0) {
                if (doneCallback) {
                    doneCallback();
                }
            } else {
                $.util.log('[Child process] exited with code ' + code);
                if (doneCallback) {
                    doneCallback("[Child process] error");
                }
            }
        });

    },
    tsc = function (projectDir, doneCallback, tscArgs) {
        var exec = require("child_process").exec;
        var cmd = "tsc -p " + projectDir;
        if (verbose) {
            cmd += " --listFiles";
        }
        if (tscArgs) {
            cmd += tscArgs;
        }

        var process = exec(cmd);
        logChildProcessOutput(process, doneCallback);
    };

// --------------------------
// CUSTOM TASK METHODS
// --------------------------

// Enable verbose mode
gulp.task('verbose', 'Sets the verbose mode', [], function (doneCallback) {
    verbose = true;
    doneCallback();
});

gulp.task('clean', 'Clear outdated minified files', [], function (doneCallback) {
    var deletedFiles = del.sync(config.paths.dest + "/**/*", { force: true });
    logFiles("Dest files deleted", deletedFiles);
    del.sync(config.paths.dest, { forece: true });
    doneCallback();
});

// gulp.task('cleanTypeScriptOutput', 'Clean TypeScript output files', [], function (doneCallback) {
//     var deletedFiles = del.sync([config.paths.dest + "/*.js", config.paths.dest + "/*.js.map", config.paths.dest + "/**/*.ts"], { force: true });
//     logFiles("TypeScript output files deleted", deletedFiles);
//     doneCallback();
// });


gulp.task('tslint', 'Run the TypeScript linter.', ['clean'], function () {
    return gulp.src(config.lintFiles)
      .pipe($.tslint())
      .pipe($.tslint.report('prose', {
          emitError: true
      }));
});

gulp.task('wiredep', 'Wire dependencies into index.html', ['clean', 'tscompile'], function () {
    $.util.log($.util.colors.green('Wiring dependencies into index.html'));

    return gulp.src(config.paths.index)
      .pipe($.inject(gulp.src(config.js.files),  {
          read: false,
          relative: false,
          addRootSlash: false,
          ignorePath: config.appRoot
      }))
      .pipe($.inject(gulp.src(config.css.files), {
          read: false,
          relative: false,
          addRootSlash: false,
          ignorePath: config.appRoot
      }))
      .pipe(gulp.dest("./"));
});

gulp.task('templates', 'Create templates.', [], function (cb) {
    return gulp.src(config.paths.html)
      .pipe($.minifyHtml({
          empty: true,
          quotes: true
      }))
      .pipe($.angularTemplatecache((pkg.name + ".tpl.js"), {
          module: moduleName,
          standalone: false,
          base: function(file) {
              var newpath = path.normalize(file.path.replace(file.cwd, ""));
              // Strip / or \ prefix
              if ((newpath.indexOf("/") == 0) || (newpath.indexOf("\\") == 0)) {
                  newpath = newpath.substring(1);
              }
              $.util.log($.util.colors.blue("Adding " + file.path + " to templateCache as " + newpath));
              return newpath;
          }
      }))
      .pipe(gulp.dest(config.paths.dest));
});

gulp.task('less', 'Compile less files.', [], function (cb) {
    return gulp.src(config.paths.less)
      .pipe($.sourcemaps.init())
      .pipe($.less({
          sourceMap: true,
          compress: true
      }))
      .pipe(concat(pkg.name + ".css"))
      .pipe(cleanCss({
           processImport: false
      }))
      .pipe(gulp.dest(config.paths.dest))
      .pipe($.minifyCss({
           keepBreaks: false
      }))
      .pipe($.rename({
          suffix: '.min'
      }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(config.paths.dest));
});

gulp.task('tscompile', 'Compile the TypeScript project (no wiring).', function (cb) {
    return tsc(".", cb);
});

gulp.task('compile-app-scripts', 'Compile app scripts.', ['tscompile', 'wiredep'], function (cb) {
    return tsc("./app/", cb);
});

gulp.task('minify-js', 'Minify javascript files', ['tscompile'], function () {
    return gulp.src(config.paths.dest + "**/*.js")
      .pipe($.sourcemaps.init())
      .pipe($.uglify())
      .pipe($.rename({
          suffix: '.min'
      }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.'));
});

gulp.task('serve', 'Build and serve', ['build'], function () {
    return gulp.src(['./'])
      .pipe($.webserver({
          livereload: {
              enable: true,
              filter: function (fileName) {
                  // ignore files not needed by browser
                  return !fileName.match(/(\.map)|(\.ts)|(\.less)$/);
              }
          },
          open: true,
          port: 1338
      }));
});

gulp.task('test-tscompile', 'Compile test typescript files.', ['build'], function (cb) {
    return tsc("./test/", cb);
});

gulp.task('test', 'Run jasmine tests', [], function (doneCallback) {
    // var karmaConfigFile = path.join(__dirname, "karma.conf.js");
    // var exec = require("child_process").exec;
    // var cmd = "karma start " + karmaConfigFile + " --single-run --reporters progress --browsers PhantomJS";
    // var process = exec(cmd);
    // logChildProcessOutput(process, doneCallback);

    // test disabled temporarily
    $.util.log($.util.colors.yellow("TVUP-12: Test disabled temporarily"));
});

gulp.task('watch', 'Watch for changes in source files', [], function () {
    var lessWatcher = gulp.watch(config.paths.less, ['less'], {
        debounceDelay: config.watchDelay
    });
    var tsWatcher = gulp.watch([config.paths.ts, config.paths.typings, config.paths.appRoot + '**/*.ts'], ['tscompile'], {
        debounceDelay: config.watchDelay
    });
    var htmlWatcher = gulp.watch(config.paths.html, ['templates'], {
        debounceDelay: config.watchDelay
    });
});

gulp.task('build', 'Run build sequence.', [
    'clean',
    'tslint',
    'tscompile',
    'compile-app-scripts',
    'less',
    'wiredep',
    'templates',
    'minify-js']);

gulp.task('build-Debug', 'Run debug build sequence.', ['build']);

gulp.task('serve-and-watch', 'Serve and watch', ['serve', 'watch']);
