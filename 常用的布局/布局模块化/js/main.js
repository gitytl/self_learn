requirejs.config({
    paths:{
        jquery:'jquery-3.3.1.min',
        formV:'form.validator'
    }
});
requirejs(['jquery','formV'],function ($,formV) {
    console.log(formV.isEqual(1,1));
    console.log(formV.rule('phone','13108801889',1));
    new formV.ScrollTop(".moveTop",{
        mode:'move',
        pos:'0',
        speed:1000
    })
});
