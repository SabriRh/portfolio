/**
 * Created by Sabri on 3/28/2016.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var obfuscate = require('gulp-obfuscate');
var argv = require('yargs').argv;
var uglifycss = require('gulp-uglifycss');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var removeLogs = require('gulp-removelogs');
var stripDebug = require('gulp-strip-debug');

var paths = {
    scripts: [
        //bower components
        "bower_components/angular/angular.js",
        "bower_components/jquery/dist/jquery.js",
        "js/porfolio.js"

    ],
    images: 'img/**',
    css: [
        //bower components
        "style/common.css",
        //scss file
        'style/generated/style.css',
    ],
    sassFiles: ['sass/*.scss'],
    fonts: ['fonts/*.*'],
    jsDestination: "build/js",
    cssDestination: "build/css",
    fontsDestination: "build/css/fonts",
    imagesDestination: "build/img",
    buildPath: "build",
    indexFileDestination: "build",
    browserSyncPath: "./"
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globing patterns as you would with `gulp.src`
    return del([paths.buildPath]);
});


gulp.task('sass', function() {
    return gulp.src(paths.sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssDestination));
});


gulp.task('css', ['sass'], function() {
    return gulp.src(paths.css)
        .pipe(concatCss("all.css"))
        .pipe(gulp.dest(paths.cssDestination))
        .pipe(browserSync.stream());
});

gulp.task('cssUgly', ['sass'], function() {
    return gulp.src(paths.css)
        .pipe(concatCss("all.min.css"))
        .pipe(uglifycss())
        .pipe(gulp.dest(paths.cssDestination))
        .pipe(browserSync.stream());
});

gulp.task('concat', function() {
    // concat all JavaScript
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.jsDestination))
        .pipe(browserSync.stream());
});

gulp.task('minify', function() {
    // Minify and copy all JavaScript
    return gulp.src(paths.scripts)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDestination))
        .pipe(browserSync.stream());
});


gulp.task('obfuscate', function() {
    // Concat, Minify and Obfusc all JavaScript
    return gulp.src(paths.scripts)
        .pipe(concat('all.min.ugly.js'))
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest(paths.jsDestination))
        .pipe(browserSync.stream());
});


// Copy all static images
gulp.task('images', function() {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(gulp.dest(paths.imagesDestination));
});

gulp.task('copyFonts', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.fontsDestination));
});

// Rerun the task when a file changes
gulp.task('watchDev', function() {
    gulp.watch(paths.scripts, ['concat']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sassFiles, ['css', 'cssUgly']);
});

// Rerun the task when a file changes
gulp.task('watchPreprod', function() {
    gulp.watch(paths.scripts, ['minify']);
    gulp.watch(paths.css, ['cssUgly']);
    gulp.watch(paths.sassFiles, ['css', 'cssUgly']);
});

gulp.task('removeLog', function() {
    return gulp.src('build/js/all.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('build/js/prodScript'));
});

// Rerun the task when a file changes
gulp.task('watchProd', function() {
    gulp.watch(paths.scripts, ['obfuscate']);
    gulp.watch(paths.css, ['cssUgly']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sassFiles, ['css', 'cssUgly']);
});

// Rerun the task when a file changes
gulp.task('watchAll', function() {
    gulp.watch(paths.scripts, ['concat', 'minify', 'obfuscate']);
    gulp.watch(paths.css, ['css', 'cssUgly']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sassFiles, ['css', 'cssUgly']);
});

var tasks, paramsForReloading;
if (argv.dev) {
    tasks = ['watchDev', 'copyFonts', 'css', 'concat', 'images'];
    paramsForReloading = "--dev";
} else if (argv.preprod) {
    tasks = ['watchPreprod', 'copyFonts', 'cssUgly', 'minify', 'images'];
    paramsForReloading = "--preprod";
} else if (argv.prod) {
    tasks = ['watchProd', 'copyFonts', 'cssUgly', 'obfuscate', 'images'];
    paramsForReloading = "--prod";
} else if (argv.all) {
    tasks = ['watchAll', 'copyFonts', 'css', 'cssUgly', 'concat', 'minify', 'obfuscate', 'images'];
    paramsForReloading = "--all";
} else {
    tasks = ['watchDev', 'copyFonts', 'css', 'concat', 'images'];
    paramsForReloading = "--dev";
}


gulp.task('serve', tasks, function() {

    browserSync.init({
        server: paths.browserSyncPath,
        port: 5000
    });

    //watch index file
    gulp.watch("./*.html").on('change', browserSync.reload);

});


// The default task (called when you run `gulp` from cli) with possible params : --dev | --preprod | --prod | --all

gulp.task('default', ['serve']
    /*,function(){ // for DB and node app auto-start
     child_process.exec('start mongod',function(err,stdout,stderr){
     console.log(stdout);
     });
     child_process.exec('start npm start',function(err,stdout,stderr){
     console.log(stdout);
     });
     }*/

);
