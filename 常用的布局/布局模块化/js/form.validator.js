define(['jquery'],function ($) {
    ScrollTop.DEFAULTS={
        topNum:0,
        speed:0,
        pos:$(window).height()
    }
    function ScrollTop(el,opts) {
        this.opts=$.extend({},ScrollTop.DEFAULTS,opts);//把用户传的值替换掉默认的值并返回一个对象
        this.$el=$(el);//缓存标签
        this._showHide();
        if(this.opts.speed!=0){
            this.$el.on('click',$.proxy(this.move,this));
        }
        else {
            this.$el.on('click',$.proxy(this.go,this));
        }
        $(window).on('scroll',$.proxy(this._showHide,this));
    }
    ScrollTop.prototype.move=function () {
        var opts=this.opts,
            topNum=opts.topNum;
        if($(window).scrollTop()!=topNum){
            if(!this.$el.is(":animated")){
                $("body,html").animate({
                    scrollTop:topNum
                },opts.speed);
            }
        }
    };
    ScrollTop.prototype.go=function () {
        var topNum=this.opts.topNum;
        if($(window).scrollTop!=topNum) {
            $("body,html").scrollTop(topNum);
        }
    };
    ScrollTop.prototype._showHide=function () {
        if($(window).scrollTop()>this.opts.pos){
            this.$el.fadeIn();
        }else {
            this.$el.fadeOut();
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