var gulp = require('gulp'),

    sass = require('gulp-sass'),//引用sass

    livereload = require('gulp-livereload'),        //浏览器上实时更新

    fileinclude = require('gulp-file-include'),     //html压缩

    minifycss=require('gulp-minify-css'),           //css压缩;

    imageMin = require('gulp-imagemin'),            //images压缩

    clean   = require('gulp-clean'),

    browserSync = require('browser-sync').create(), //浏览器实时刷新
    reload = browserSync.reload;

var project_name='dist';


gulp.task("clean",async ()=>{
    gulp.src('./'+project_name+'/**/*.*')
            .pipe(clean());
});
gulp.task("watch",async ()=>{
    livereload.listen();
    //配置浏览器路径参数
    browserSync.init({
        server:'./'+project_name+'/', //这里指的是根目录，如果你的index.html在根目录下，会直接打开index页面，不然会显示Get Not，自己写路径就行
        port:8081  //默认打开localhost:3000,现在改成localhost:8081
    });
    gulp.watch("src/**/*.*",async (file)=>{
        livereload.changed(file.path);
        /*html编译*/
        gulp.src('src/project_name/*.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(project_name))
            .pipe(reload({stream:true}));
        gulp.src('src/base.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('src/base'))
            .pipe(reload({stream:true}));
        /*sass编译任务*/
        gulp.src('src/css/*.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(minifycss())
            .pipe(gulp.dest(project_name+'/css'))
            .pipe(reload({stream:true}));
        gulp.src('src/css/css/base.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(minifycss())
            .pipe(gulp.dest('src/base'))
            .pipe(reload({stream:true}));
        /*压缩任务*/
        gulp.src('src/images/*.*')          //监听路径
            .pipe(imageMin())
            .pipe(gulp.dest(project_name+'/images')) //输出路径
            .pipe(reload({stream:true}));
    });
});
gulp.task("default",gulp.series('clean','watch'));
