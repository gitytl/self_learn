define(['jquery','form.validator'],function ($,scrollTo) {
    function BackTop(el,opts) {
        this.opts=$.extend({},BackTop.DEFAULTS,opts);
        this.$el=$(el);
        this.scroll=new scrollTo.ScrollTop({
            topNum:0,
            speed:this.opts.speed
        });
        this._showHide();
        if(this.opts.mode=='move'){
            this.$el.on('click',$.proxy(this._move,this));
        }
        else {
            this.$el.on('click',$.proxy(this._go,this));
        }
        $(window).on('scroll',$.proxy(this._showHide,this));
    }
    BackTop.DEFAULTS={
        mode:'move',
        pos:$(window).height()
    };
    BackTop.prototype._move=function () {
            this.scroll.move();
    };
    BackTop.prototype._go=function () {
        this.scroll.go();
    };
    BackTop.prototype._showHide=function () {
        if($(window).scrollTop()>this.opts.pos){
            this.$el.fadeIn();
        }else {
            this.$el.fadeOut();
        }
    };
    return{
        BackTop:BackTop
    }
});