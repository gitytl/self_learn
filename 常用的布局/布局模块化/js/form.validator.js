define(['jquery'],function ($) {
    ScrollTop.DEFAULTS={
        topNum:0,
        speed:800
    }
    function ScrollTop(opts) {
        this.opts=$.extend({},ScrollTop.DEFAULTS,opts);//把用户传的值替换掉默认的值并返回一个对象
        this.$el=$('html,body');//缓存标签
    }
    ScrollTop.prototype.move=function () {
        var opts=this.opts;
            topNum=opts.topNum;
        if($(window).scrollTop!=topNum){
            if(!this.$el.is(":animated")){
                this.$el.animate({
                    scrollTop:topNum
                },opts.speed);
            }
        }
    };
    ScrollTop.prototype.go=function () {
        var topNum=this.opts.topNum;
        if($(window).scrollTop!=topNum) {
            this.$el.scrollTop(topNum);
        }
    };
    var result=null;
    return{
        isEqual:function (str1,str2) {
            (str1===str2)? result=true:result=false;
            return result;
        },
        rule:function (style,str,len) {
            var phoneRule=/^1(3|4|5|7|8)\d{9}$/;
            if(style=='phone'){return phoneRule.test(str);}
        },
        ScrollTop:ScrollTop
    }
});