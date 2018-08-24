/**
 * Created by Administrator on 2017/8/1.
 */
$(function() {
    (function () {
        var winW = $(window).width();
        if (winW > 750) {
            winW = 750;
        }
        $('html').css('font-size', winW / 7.5);
        $(window).resize(function () {
            winW = $(window).width();
            if (winW > 750) {
                winW = 750;
            }
            $('html').css('font-size', winW / 7.5);
        })
    })();
});