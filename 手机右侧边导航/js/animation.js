$(function() {
    /*px转为rem*/
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
    /*导航点击向左移动*/
    (function () {
        var navList=$('.navList'),
            navCon=  $('.navList li'),
            footer=$(".footer"),
            header_content=$('.headerCon,.content'),
            oneNav=$(".navList .oneNav"),
            twoNav=$(".navList .twoNav");
        var dlParentIndex="";
        $('.navButton').click(function(){
            if(navList.css('width')=='0px'){
                navList.animate({'width':'3.8rem','margin-left':'3.7rem'},500);
                header_content.animate({'margin-left':'-3.8rem'},500);
            }
            else{
                twoNav.slideUp();
                navList.animate({'width':'0px','margin-left':'7.5rem'},500,function () {
                    navCon.removeClass('on');
                    if(!twoNav.find('dd').hasClass('on')){
                        navCon.eq(0).addClass('on');
                    }else {
                        navCon.eq(dlParentIndex).addClass('on');
                    }
                });
                header_content.animate({'margin-left':'0rem'},500);
            }
        });
        navList.height($('html,body').height()-footer.outerHeight(true));
        oneNav.click(function () {
            if($(this).siblings().css('display')=='none'){
                $(this).parent().siblings().removeClass('on');
                $(this).parent().addClass('on');
                twoNav.slideUp();
                $(this).siblings().slideDown();
            }
            else {
                $(this).siblings().slideUp();
            }
        });
        twoNav.find('dd').click(function () {
            dlParentIndex=$(this).parent().parent().index();
            twoNav.find('dd').removeClass('on');
            $(this).addClass('on');
            $(this).parent().slideUp();
            navList.animate({'width':'0px','margin-left':'7.5rem'},500);
            header_content.animate({'margin-left':'0rem'},500);
        });
    })();
    /*swiper_banner*/
    (function(){
        var swiper = new Swiper('.banner', {
            autoplay:3000,
            loop: true,
            autoplayDisableOnInteraction : false,
            pagination: '.swiper-pagination',
            paginationClickable: '.swiper-pagination',
            spaceBetween: 30,
            effect: 'fade'
        });
    })();
});