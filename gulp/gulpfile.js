var gulp = require('gulp'),

    sass = require('gulp-sass'),//引用sass

    fileinclude = require('gulp-file-include'),     //html压缩

    minifycss=require('gulp-minify-css'),           //css压缩;

    imageMin = require('gulp-imagemin'),            //images压缩

    clean   = require('gulp-clean'),

    browserSync = require('browser-sync').create(), //浏览器实时刷新
    reload = browserSync.reload;

var project_name='project_name';

gulp.task("clean",async ()=>{
    gulp.src('./dist/'+project_name+'/**/*.*')
        .pipe(clean());
});
gulp.task("watch",async ()=>{
    //配置浏览器路径参数
    browserSync.init({
        server:'./dist/'+project_name+'/', //这里指的是根目录，如果你的index.html在根目录下，会直接打开index页面，不然会显示Get Not，自己写路径就行
        port:8081  //默认打开localhost:3000,现在改成localhost:8081
    });
    gulp.watch("src/**/*.*",async (file)=>{
        /*html编译*/
        gulp.src('src/'+project_name+'/*.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/'+project_name))
            .pipe(reload({stream:true}));
        /*sass编译任务*/
        gulp.src('src/'+project_name+'/css/*.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(minifycss())
            .pipe(gulp.dest('dist/'+project_name+'/style_js'))
            .pipe(reload({stream:true}));
        gulp.src('src/'+project_name+'/css/*.js')
            .pipe(gulp.dest('dist/'+project_name+'/style_js'))
            .pipe(reload({stream:true}));
        gulp.src('src/'+project_name+'/css/*.css')
            .pipe(gulp.dest('dist/'+project_name+'/style_js'))
            .pipe(reload({stream:true}));
        /*图片压缩任务*/
        gulp.src('src/'+project_name+'/images/*.*')          //监听路径
            .pipe(imageMin())
            .pipe(gulp.dest('dist/'+project_name+'/images')) //输出路径
            .pipe(reload({stream:true}));
        /*default*/
        gulp.src('src/default/base.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/default'))
            .pipe(reload({stream:true}));
        gulp.src('src/default/css/base.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(minifycss())
            .pipe(gulp.dest('dist/default'))
            .pipe(reload({stream:true}));
        gulp.src('src/default/baseimg/*.*')          //监听路径
            .pipe(imageMin())
            .pipe(gulp.dest('dist/default/baseimg')) //输出路径
            .pipe(reload({stream:true}));
    });
});
//gulp.task("default",gulp.series('clean','watch'));
gulp.task("default",gulp.series('watch'));
