var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssnano'),
    webpack = require('webpack'),
    rename = require('gulp-rename');

var prefixerOptions = {
    browsers: ["last 2 versions"]
    };
      

gulp.task("style", function(){
    return gulp
        .src("./sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({ includePaths: require("node-normalize-scss").includePaths}).on(
                "error",
                sass.logError
            )
        )
        .pipe(prefix(prefixerOptions))
        .on("error",function(errorInfo){
            console.log(errorInfo.toString());
            this.emit("end");
        })
        .pipe(rename("styles.css"))
        .pipe(gulp.dest("./css/"))
        .pipe(cssmin())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./css/"));
}); 

gulp.task('scripts',function(callback){
    webpack(require('./webpack.config.js'),function(err, stats){
        if (err) {
            console.log(err.toString());    
        }
        console.log(stats.toString());
        callback();
    });
});

gulp.task("watch",function(){
    gulp.watch('./sass/**/*.scss',gulp.series('style'));
    gulp.watch('./src/**/*.js',gulp.series('scripts'));
});

