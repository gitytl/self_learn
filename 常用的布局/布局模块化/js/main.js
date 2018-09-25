requirejs.config({
    paths:{
        jquery:'jquery-3.3.1.min',
        formV:'form.validator'
    }
});
requirejs(['jquery','backTop'],function ($,backTop) {
    new backTop.BackTop($(".moveTop1"),{
        mode:'move',
        pos:'0',
        speed:500
    })

});
/*
    requirejs(['jquery','formV'],function ($,formV) {
    console.log(formV.isEqual(1,1));
    console.log(formV.rule('phone','13108801889',1));
    var scrollTop=new formV.ScrollTop({
        //传递参数
        topNum:30,
        speed:1000
    });
    var scrollTop1=new formV.ScrollTop({
        //传递参数
        topNum:500,
        speed:1000
    });//实例化对象
    $('.moveTop1').click($.proxy(scrollTop.move,scrollTop));
    $('.moveTop2').click($.proxy(scrollTop.go,scrollTop1));
    });
    */