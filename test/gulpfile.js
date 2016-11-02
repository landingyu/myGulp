var gulp = require('gulp');
var uglify = require('gulp-uglify'); 
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var watchPath = require('gulp-watch-path');
var connect = require('gulp-connect');
gulp.task('uglify', function() {
gulp.src(['app/script/*.js','!app/newScript/*.min.js'])
.pipe(rename({suffix:'.min'}))
.pipe(uglify())
.pipe(gulp.dest('app/newScript'));
});
 gulp.task('connect',function(){
    connect.server({
        root:'./',  
        ip:'192.168.31.110',
        livereload:true
    })
})
gulp.task('watch', function () {   
    gulp.watch('app/script/*.js',function(event){ 
    var paths = watchPath(event, 'app/script', 'app/newScript'); 
    gulp.src(paths.srcPath) 
    .pipe(uglify()) 
    .pipe(gulp.dest(paths.distDir)) 
    })

});
gulp.task('live', function () {    // 这里的watch，是自定义的，写成live或者别的也行
     livereload.listen();//这里需要注意！旧版使用var server = livereload();已经失效  
    gulp.watch(['app/**/*.*'], function(event){  
        livereload.changed(event.path);  
    });
});
gulp.task('default',['connect','watch','live'])