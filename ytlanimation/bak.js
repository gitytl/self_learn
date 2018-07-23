(function ($) {
    $.fn.extend({
        //新闻向上逐条滚动
        "newsMove": function (options) {
            if (!isValid(options))
                return this;
            if (options) {
                //存在参数时覆盖默认参数
                var opts = $.extend({}, defaluts, options);
            }
            else {
                //不存在参数时使用默认参数
                var opts = $.extend({}, defaluts);
            }
            return this.each(function () {
                var $this = $(this);
                var s = 0;
                var time = null;

                function move() {
                    s++;
                    if (s > $this.find('li').length - 1) {
                        s = 0;
                    }
                    var move = s * -$this.height();
                    $this.find('ul').animate({
                        marginTop: move
                    }, opts.timer / 2);
                }

                time = setInterval(function () {
                    move();
                }, opts.timer);
                moseHover(opts, $this, time, move);
            });
        },
        //手风琴
        "accordion": function (options) {
            if (!isValid(options))
                return this;
            if (options) {
                //存在参数时覆盖默认参数
                var opts = $.extend({}, defaluts, options);
            }
            else {
                //不存在参数时使用默认参数
                var opts = $.extend({}, defaluts);
            }
            return this.each(function () {
                var $this = $(this);
                var LtRBox = '.ytl_sfqListLtR',
                    leftBox = '.ytl_sfqListLeft',
                    rightBox = '.ytl_sfqListRight',
                    TtDBox = '.ytl_sfqListTtD',
                    topBox = '.ytl_sfqListTop',
                    downBox = '.ytl_sfqListDown';
                var LtRClass = 'ytl_sfqListLtR',
                    leftClass = 'ytl_sfqListLeft',
                    rightClass = 'ytl_sfqListRight',
                    TtDClass = 'ytl_sfqListTtD',
                    topClass = 'ytl_sfqListTop',
                    downClass = 'ytl_sfqListDown';
                var leftRightW = $(leftBox).width() + $(rightBox).width();
                if (opts.accordion == 'LtR') {
                    $(LtRBox).eq(0).css({'width': leftRightW});
                    var $thisLeftClick = $this.find(leftBox).width();
                    if (opts.clickHover == 'click') {
                        $(LtRBox).click(function () {
                            $(this).stop().animate({width: leftRightW}, opts.timer).siblings().stop().animate({width: $thisLeftClick}, opts.timer);
                        });
                    } else {
                        $(LtRBox).hover(function () {
                            $(this).stop().animate({width: leftRightW}, opts.timer).siblings().stop().animate({width: $thisLeftClick}, opts.timer);
                        });
                    }
                }
                else {
                    $this.find(LtRBox).addClass(TtDClass).removeClass(LtRClass);
                    $this.find(leftBox).addClass(topClass).removeClass(leftClass);
                    $this.find(rightBox).addClass(downClass).removeClass(rightClass);
                    var topDownH = $(topBox).height() + $(downBox).height();
                    $this.find(TtDBox).eq(0).css({'height': topDownH});
                    var $thisTopClick = $(this).find(topBox).height();
                    if (opts.clickHover == 'click') {
                        $this.find(TtDBox).click(function () {
                            $(this).stop(true).animate({height: topDownH}, opts.timer).siblings().stop(true).animate({height: $thisTopClick}, opts.timer)
                        });
                    } else {
                        $this.find(TtDBox).hover(function () {
                            $(this).stop(true).animate({height: topDownH}, opts.timer).siblings().stop(true).animate({height: $thisTopClick}, opts.timer)
                        });
                    }
                }
            });
        },
        //滚动
        "scroll": function (options) {
            if (!isValid(options)) return this;
            if (options) {
                var opts = $.extend({}, defaluts, options);
            }
            else {
                var opts = $.extend({}, defaluts);
            }
            return this.each(function () {
                var $this = $(this);
                var divBox = '.ytl_conLrLB',
                    ulBox = '.ytl_lrLbList',
                    liBox = '.ytl_lrLbList .element';
                var tdDivBox = '.ytl_conTdLB',
                    tdUlBox = '.ytl_tdLbList',
                    tdLiBox = '.ytl_tdLbList .element';
                var time = null;
                clearInterval(time);
                var s = 0;
                if (opts.scroll == 'lrScroll' || opts.scroll == 'wfLrScroll') {
                    var $thisW = $(liBox).outerWidth() * opts.showNum + parseInt($(liBox).css('margin-right')) * (opts.showNum - 1);
                    $this.width($thisW);
                    $this.height($(liBox).outerHeight());
                    $this.find(ulBox).width(($(liBox).outerWidth() + parseInt($(liBox).css('margin-right'))) * $(liBox).length);
                    var moveNum = $(liBox).outerWidth() + parseInt($(liBox).css('margin-right'));

                    /*左右滚动*/
                    if (opts.scroll == 'lrScroll') {
                        function lrScroll() {
                            (opts.direction == 'left') ? s++ : s--;
                            if (s > $this.find(liBox).length - opts.showNum) {
                                s = 0;
                            }
                            if (s < 0) {
                                s = $this.find(liBox).length - opts.showNum;
                            }
                            var move = s * -moveNum;
                            $this.find(ulBox).stop(true).animate({
                                left: move
                            }, opts.timer / $this.find(liBox).length);
                        }

                        time = setInterval(function () {
                            lrScroll();
                        }, opts.timer);
                        moseHover(opts, $this, time, lrScroll);
                    }
                    /*左右无缝滚动*/
                    if (opts.scroll == 'wfLrScroll') {
                        var i = 0;
                        for (i; i < opts.showNum; i++) {
                            var htm = $this.find(liBox).eq(i).clone();
                            $this.find(liBox).eq($this.find(liBox).length - 1).after(htm);
                        }
                        $this.find(ulBox).width(($(liBox).outerWidth() + parseInt($(liBox).css('margin-right'))) * $(liBox).length);

                        function wfLrScroll() {
                            (opts.direction == 'left') ? s += -1 : s -= -1;
                            if (s < -($this.find(ulBox).width() - $this.width() - parseInt($(liBox).css('margin-right')))) {
                                s = 0;
                            }
                            if (s > 0) {
                                s = -($this.find(ulBox).width() - $this.width() - parseInt($(liBox).css('margin-right')));
                            }
                            if (opts.showNum < $this.find(liBox).length) {
                                $this.find(ulBox).css({'left': s});
                            }
                        }

                        time = setInterval(function () {
                            wfLrScroll();
                        }, opts.timer);
                        moseHover(opts, $this, time, wfLrScroll);
                    }
                }
                if (opts.scroll == 'tdScroll' || opts.scroll == 'wfTdScroll') {
                    var thisH = $(tdLiBox).outerHeight() * opts.showNum + parseInt($(tdLiBox).css('margin-bottom')) * (opts.showNum - 1);
                    $this.width($this.find(tdLiBox).outerWidth());
                    $this.height(thisH);
                    var moveNum = $(liBox).outerHeight() + parseInt($(liBox).css('margin-bottom'));
                    /*上下滚动*/
                    if (opts.scroll == 'tdScroll') {
                        function tdScroll() {
                            (opts.direction == 'top') ? s++ : s--;
                            if (s > $this.find(liBox).length - opts.showNum) {
                                s = 0;
                            }
                            if (s < 0) {
                                s = $this.find(liBox).length - opts.showNum;
                            }
                            var move = s * -moveNum;
                            $this.find(tdUlBox).stop(true).animate({
                                top: move
                            }, opts.timer / 2);
                        }

                        time = setInterval(function () {
                            tdScroll();
                        }, opts.timer);
                        moseHover(opts, $this, time, tdScroll);
                    }
                    /*上下无缝滚动*/
                    if (opts.scroll == 'wfTdScroll') {
                        var i = 0;
                        for (i; i < opts.showNum; i++) {
                            var htm = $this.find(tdLiBox).eq(i).clone();
                            $this.find(tdLiBox).eq($this.find(tdLiBox).length - 1).after(htm);
                        }

                        function wfTdScroll() {
                            (opts.direction == 'top') ? s += -1 : s -= -1;
                            if (s < -($this.find(tdUlBox).height() - $this.height() - parseInt($(tdLiBox).css('margin-bottom')))) {
                                s = 0;
                            }
                            if (s > 0) {
                                s = -($this.find(tdUlBox).height() - $this.height() - parseInt($(tdLiBox).css('margin-bottom')));
                            }
                            if (opts.showNum < $this.find(tdLiBox).length) {
                                $this.find(tdUlBox).css({'top': s});
                            }
                        }

                        time = setInterval(function () {
                            wfTdScroll();
                        }, opts.timer);
                        moseHover(opts, $this, time, wfTdScroll);
                    }
                }
            });
        },
        //百合窗
        "lilyWindow": function (options) {
            if (!isValid) {
                return this;
            }
            if (options) {
                var opts = $.extend({}, defaluts, options);
            } else {
                var opts = $.extend({}, defaluts);
            }
            return this.each(function () {
                var $this = $(this);
                var s = 0,
                    time = null,
                    getS=0;
                var ulBox = '.ytl_picCarousel',
                    ulLiBox = '.ytl_picCarousel li',
                    olBox='.ytl_pointLists',
                    olLiBox='.ytl_pointLists li';
                imgOlBox='.ytl_smallImgList';
                imgOlLiBox='.ytl_smallImgList li';
                var Lenth = $this.find(ulLiBox).length;
                $this.find(ulLiBox).each(function (index) {
                    $(this).css({
                        'z-index': Lenth - index,
                    })
                });
                time = setInterval(function () {
                    animation();
                }, opts.timer);
                /*创建点*/
                /*isCreatePoint(opts.createPoint,$this);*/
                isCreateImg(opts.createImg,$this);
                clickHover();
                moseHover(opts, $this, time, animation);

                function animation() {
                    var arr = [];
                    arr = opts.deleteCarousel.split(",");
                    //随机取出数组中的元素
                    var index = Math.floor((Math.random() * arr.length));
                    switch (parseInt(arr[index])) {
                        case 1:
                            fade();
                            break;
                        case 2:
                            diagonalStrips(1,1);
                            break;
                        case 3:
                            diagonalStrips(1,2);
                            break;
                        case 4:
                            diagonalStrips(2,1);
                            break;
                        case 5:
                            diagonalStrips(2, 2);
                            break;
                        case 6:
                            cross();
                            break;
                        case 7:
                            grid();
                            break;
                        case 8:
                            allMove(1, 1);
                            break;
                        case 9:
                            allMove(1, 2);
                            break;
                        case 10:
                            allMove(2, 1);
                            break;
                        case 11:
                            allMove(2, 2);
                            break;
                    }
                }
                var lrTop=true;
                /*淡入淡出*/
                function fade() {
                    var eqNum=s-1;
                    (opts.nextPrev=='next')?s++:s--;
                    if (s >= Lenth) {
                        s = 0;
                    }
                    $this.find(ulLiBox).eq(s-1).animate({'opacity': '0'}, opts.timer * (2 / 3));
                    clearDiv(eqNum);
                    initialize();
                }
                /*层次移动*/
                function diagonalStrips(ids,id) {
                    var eqNum=s-1;
                    switch (ids) {
                        case 1:
                            createDiv(1,s);
                            (opts.nextPrev=='next')?s++:s--;
                            lrTop=!lrTop;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            for(var i=1;i<=opts.divLevelNum;i++){
                                var left=0;
                                if(lrTop){
                                    left=$this.width() + i * $this.find(ulLiBox).outerHeight()/opts.divLevelNum;
                                }
                                else {
                                    left=$this.width() + (opts.divLevelNum - i) * $this.find(ulLiBox).outerHeight()/opts.divLevelNum;
                                }
                                (id==1)?left:left=-left;
                                $this.find(ulLiBox).eq(s-1).find('.ytl_imgActive').eq(i-1).animate({'left':left},opts.timer);
                            }
                            break;
                        case 2:
                            createDiv(2,s);
                            (opts.nextPrev=='next')?s++:s--;
                            lrTop=!lrTop;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            for(var i=1;i<=opts.divVerticalNum;i++){
                                var top=0;
                                if(lrTop){
                                    top=$this.height() + i * $this.find(ulLiBox).outerWidth()/opts.divVerticalNum;
                                }
                                else {
                                    top=$this.height() + (opts.divVerticalNum - i) * $this.find(ulLiBox).outerWidth()/opts.divVerticalNum;
                                }
                                (id==1)?top:top=-top;
                                $this.find(ulLiBox).eq(s-1).find('.ytl_imgActive').eq(i-1).animate({'top':top},opts.timer);
                            }
                            break;
                    }
                    clearDiv(eqNum);
                    initialize();
                }
                /*交叉动画*/
                function cross() {
                    var eqNum=s-1;
                    lrTop=!lrTop;
                    (lrTop)?createDiv(1,s):createDiv(2,s);
                    (opts.nextPrev=='next')?s++:s--;
                    if (s >= Lenth) {
                        s = 0;
                    }
                    for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                        if(lrTop){
                            var change={};
                            (divIndex % 2 == 0)?change={'width': '0'}:change={'left': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate(change, opts.timer);
                        }
                        else{
                            var change={};
                            (divIndex % 2 == 0)?change={'height': '0'}:change={'top': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate(change, opts.timer);
                        }
                    }
                    clearDiv(eqNum);
                    initialize();
                }
                /*格子动画*/
                function grid() {
                    var eqNum=s-1;
                    createDiv(3,s);
                    lrTop=!lrTop;
                    (opts.nextPrev=='next')?s++:s--;
                    if (s >= Lenth) {
                        s = 0;
                    }
                    for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                        var change={};
                        var marinL = parseInt($this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(1).css('left')) - parseInt($this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(0).css('left'));
                        (lrTop)?change={'width': '0px'}:change={'width': '0px', 'margin-left': marinL + 'px'};
                        $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(2 * divIndex).stop(true).animate(change, opts.timer / 3);
                        setTimeout(function () {
                            $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').stop(true).animate(change, opts.timer / 3);
                        },opts.timer / 3);
                    }
                    clearDiv(eqNum);
                    initialize();
                }
                /*整块移动：allMove参数为1,1向左,1,2向右，为2,1向上,2,2向下；*/
                function allMove(ids, id) {
                    var eqNum=s-1;
                    lrTop=!lrTop;
                    switch (ids) {
                        case 1:
                            (opts.nextPrev=='next')?s++:s--;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            var move = -$this.find(ulLiBox).outerWidth();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(s - 1).stop().animate({'left': move + 'px'}, opts.timer * (2 / 3));
                            break;
                        case 2:
                            (opts.nextPrev=='next')?s++:s--;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            var move = -$this.find(ulLiBox).outerHeight();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(s - 1).stop().animate({'top': move + 'px'}, opts.timer * (2 / 3));
                            break;
                    }
                    clearDiv(eqNum);
                    initialize();
                }
                /*初始化设置*/
                function initialize() {
                    $this.find(ulLiBox).css({'opacity': '1'});
                    $this.find(ulLiBox).css({'top': 0,'left':0});
                    $this.find(ulLiBox).each(function (index) {
                        $(this).css({
                            'z-index': Lenth - index,
                        })
                    });
                    $this.find(olLiBox).eq(s).addClass('ytl_pointActive').siblings().removeClass('ytl_pointActive');
                    $this.find(imgOlLiBox).eq(s).addClass('ytl_smallImgActive').siblings().removeClass('ytl_smallImgActive');
                    $this.find(ulLiBox).eq(s-1).css({"z-index": 20});
                    $this.find(ulLiBox).eq(s).css({"z-index": 19});
                }
                /*清除div节点*/
                function clearDiv(eqNum) {
                    var imgCon = $this.find(ulLiBox).eq(eqNum).find('img').attr('src');
                    $this.find(ulLiBox).eq(eqNum).html('');
                    $this.find(ulLiBox).eq(eqNum).append("<img src=" + imgCon + " alt=''>");
                }
                /*创建div节点*/
                function createDiv(ids,eqNum) {
                    switch (ids) {
                        //创建水平div
                        case 1:
                            var imgCon = $this.find(ulLiBox).eq(eqNum).find('img').attr('src');
                            $this.find(ulLiBox).eq(eqNum).html('');
                            for (var i = 0; i < opts.divLevelNum; i++) {
                                $this.find(ulLiBox).eq(eqNum).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'width': $this.find(ulLiBox).width(),
                                    'height': $this.find(ulLiBox).height(),
                                    'display': 'block'
                                });

                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'width': '100%',
                                    'height': $this.find(ulLiBox).height() / opts.divLevelNum,
                                    'top': ($this.find(ulLiBox).height() / opts.divLevelNum) * i
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'margin-top': -parseInt($this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css('top'))
                                });
                            }
                            break;
                        //创建垂直div
                        case 2:
                            var imgCon = $this.find(ulLiBox).eq(eqNum).find('img').attr('src');
                            $this.find(ulLiBox).eq(eqNum).html('');
                            for (var i = 0; i < opts.divVerticalNum; i++) {
                                $this.find(ulLiBox).eq(eqNum).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'width': $this.find(ulLiBox).width(),
                                    'height': $this.find(ulLiBox).height(),
                                    'display': 'block'
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'width': $this.find(ulLiBox).width() / opts.divVerticalNum,
                                    'height': '100%',
                                    'left': ($this.find(ulLiBox).width() / opts.divVerticalNum) * i
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'margin-left': -parseInt($this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css('left'))
                                });

                            }
                            break;
                        //创建格子div
                        case 3:
                            var divLevelNum3 = Math.ceil(opts.divLevelNum/2);
                            var divVerticalNum3 = Math.ceil(opts.divVerticalNum/2);
                            console.log(divLevelNum3*divVerticalNum3);
                            var imgCon = $this.find(ulLiBox).eq(eqNum).find('img').attr('src');
                            $this.find(ulLiBox).eq(eqNum).html('');
                            for (var i = 0; i < divLevelNum3 * divVerticalNum3; i++) {

                                $this.find(ulLiBox).eq(eqNum).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'width': $this.find(ulLiBox).width(),
                                    'height': $this.find(ulLiBox).height(),
                                    'display': 'block'
                                });
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                    'width': $this.find(ulLiBox).width() / divVerticalNum3,
                                    'height': $this.find(ulLiBox).height() / divLevelNum3
                                });
                                for (var verticalNum = 0; verticalNum < divVerticalNum3; verticalNum++) {
                                    if ((i + 1) % divLevelNum3 == verticalNum) {
                                        $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                            'left': (verticalNum - 1) * $this.find(ulLiBox).width() / divVerticalNum3 + 'px'
                                        });
                                    }
                                    if ((i + 1) % divLevelNum3 == 0) {
                                        $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                            'left': (divVerticalNum3 - 1) * $this.find(ulLiBox).width() / divVerticalNum3 + 'px'
                                        });
                                    }
                                }
                                for (var levelNum = 0; levelNum < divLevelNum3; levelNum++) {
                                    if (parseInt(i / divLevelNum3) == levelNum) {
                                        $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css({
                                            'top': (levelNum) * ($this.find(ulLiBox).height() / divLevelNum3) + 'px'
                                        });
                                    }
                                }
                                $this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).find('img').css({
                                    'margin-left': -parseInt($this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css('left')),
                                    'margin-top': -parseInt($this.find(ulLiBox).eq(eqNum).find('.ytl_imgActive').eq(i).css('top'))
                                });
                            }
                            break;
                    }
                }
                /*点点的点击或移入*/
                function clickHover() {
                    var clickBox="";
                    /*var activeClass=".ytl_smallImgActive"*/
                    var activeClass="";
                    if(opts.createPoint) {
                        clickBox=".ytl_pointLists>li";
                        activeClass=".ytl_pointActive";
                    }
                    var arr = [],lrTop=true;
                    var beforeIndex='',afterIndex='';
                    $this.find(clickBox).on(opts.clickHover,function () {
                        beforeIndex=$this.find(activeClass).index();
                        $(this).addClass(activeClass).siblings().removeClass(activeClass);
                        afterIndex=$this.find(activeClass).index();
                        lrTop=!lrTop;
                        if(beforeIndex==afterIndex){
                            $this.find(ulLiBox).eq(beforeIndex).show();
                        }
                        else {
                            $this.find(ulLiBox).css({'opacity': '1'});
                            $this.find(ulLiBox).css({'top': 0,'left':0});
                            $this.find(ulLiBox).each(function (index) {
                                $(this).css({
                                    'z-index': Lenth - index,
                                })
                            });
                            $this.find(ulLiBox).eq(beforeIndex).css({"z-index": 20});
                            $this.find(ulLiBox).eq(afterIndex).css({"z-index": 19});
                            clearDiv(afterIndex);
                            s=afterIndex;
                            var arr = [];
                            arr = opts.deleteCarousel.split(",");
                            //随机取出数组中的元素
                            var index = Math.floor((Math.random() * arr.length));
                            switch (parseInt(arr[index])) {
                                case 1:
                                    clickFade(beforeIndex);
                                    break;
                                case 2:
                                    clickDiagonalStrips(1,1,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 3:
                                    clickDiagonalStrips(1,2,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 4:
                                    clickDiagonalStrips(2,1,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 5:
                                    clickDiagonalStrips(2,2,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 6:
                                    clickCross(lrTop,afterIndex,beforeIndex);
                                    break;
                                case 7:
                                    clickGrid(lrTop,afterIndex,beforeIndex);
                                    break;
                                case 8:
                                    clickAllMove(1,1,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 9:
                                    clickAllMove(1,2,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 10:
                                    clickAllMove(2,1,lrTop,afterIndex,beforeIndex);
                                    break;
                                case 11:
                                    clickAllMove(2,2,lrTop,afterIndex,beforeIndex);
                                    break;
                            }
                        }
                    });
                }
                function clickFade(beforeIndex) {
                    $this.find(ulLiBox).eq(beforeIndex).animate({'opacity': '0'}, opts.timer * (2 / 3));
                }
                function clickDiagonalStrips(ids,id,lrTop,afterIndex,beforeIndex) {
                    switch (ids){
                        case 1:
                            var eqNum=afterIndex;
                            createDiv(1,beforeIndex);
                            for(var i=1;i<=opts.divLevelNum;i++){
                                var left=0;
                                if(lrTop){
                                    left=$this.width() + i * $this.find(ulLiBox).outerHeight()/opts.divLevelNum;
                                }
                                else {
                                    left=$this.width() + (opts.divLevelNum - i) * $this.find(ulLiBox).outerHeight()/opts.divLevelNum;
                                }
                                (id==1)?left:left=-left;
                                $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(i-1).stop(true,true).animate({'left':left},opts.timer);
                            }
                            break;
                        case 2:
                            var eqNum=afterIndex;
                            createDiv(2,beforeIndex);
                            for(var i=1;i<=opts.divVerticalNum;i++){
                                var top=0;
                                if(lrTop){
                                    top=$this.height() + i * $this.find(ulLiBox).outerWidth()/opts.divVerticalNum;
                                }
                                else {
                                    top=$this.height() + (opts.divVerticalNum - i) * $this.find(ulLiBox).outerWidth()/opts.divVerticalNum;
                                }
                                (id==1)?top:top=-top;
                                $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(i-1).animate({'top':top},opts.timer);
                            }
                    }
                }
                function clickCross(lrTop,afterIndex,beforeIndex) {
                    var eqNum=afterIndex;
                    (lrTop)?createDiv(1,beforeIndex):createDiv(2,beforeIndex);
                    for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                        if(lrTop){
                            var change={};
                            (divIndex % 2 == 0)?change={'width': '0'}:change={'left': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate(change, opts.timer);
                        }
                        else{
                            var change={};
                            (divIndex % 2 == 0)?change={'height': '0'}:change={'top': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate(change, opts.timer);
                        }
                    }
                }
                function clickGrid(lrTop,afterIndex,beforeIndex) {
                    var eqNum=afterIndex;
                    createDiv(3,beforeIndex);
                    for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                        var change={};
                        var marinL = parseInt($this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(1).css('left')) - parseInt($this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(0).css('left'));
                        (lrTop)?change={'width': '0px'}:change={'width': '0px', 'margin-left': marinL + 'px'};
                        $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(2 * divIndex).stop(true).animate(change, opts.timer / 3);
                        setTimeout(function () {
                            $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').stop(true).animate(change, opts.timer / 3);
                        },opts.timer / 3);
                    }
                }
                function clickAllMove(ids,id,lrTop,afterIndex,beforeIndex) {
                    var eqNum=afterIndex;
                    var move = 0;
                    switch (ids) {
                        case 1:
                            move = -$this.find(ulLiBox).outerWidth();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(beforeIndex).stop().animate({'left': move + 'px'}, opts.timer * (2 / 3));
                            break;
                        case 2:
                            move = -$this.find(ulLiBox).outerHeight();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(beforeIndex).stop().animate({'top': move + 'px'}, opts.timer * (2 / 3));
                            break;
                    }
                }
            })
        }
    });

    //默认参数
    var defaluts = {
        autoPlay: true,
        timer: 20,
        accordion: 'FtR',       //手风琴排列方向默认FtR左往右
        clickHover: 'hover',    //判断事件为点击还是移入移出，默认为移入移出
        moseHover: true,        // 鼠标移入是否停止动画，默认不停止为false
        showNum: 4,                 //轮播滚动显示数量
        direction: 'left',      //滚动方向，默认left向左
        scroll: 'lrScroll',     //滚动方式（lrScroll，wfScroll），默认lrScroll左右滚动
        deleteCarousel: "1,2,3,4,5,6,7,8,9,10,11",
        divLevelNum:5,
        divVerticalNum:5,
        createPoint:true,
        createImg:true,
        nextPrev:'next',
        pointAnimation:true,
    };

    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
    /*是否移入停止*/
    function moseHover(opts, $this, time, fn) {
        //鼠标移入是否停止动画
        if (opts.moseHover == true) {
            $this.find('li').hover(function () {
                var timerStop = clearInterval(time);
            }, function () {
                time = setInterval(function () {
                    $this.find('ul li').each(function () {
                        var imgCon = $(this).find('img').attr('src');
                        $(this).html('');
                        $(this).append("<img src=" + imgCon + " alt=''>");
                    });
                    fn();
                }, opts.timer);
            });
        }
    }
    /*创建点点*/
    function isCreatePoint(createPoint, $this) {
        if (createPoint) {
            var pointList = "";
            for (var i = 0; i < $this.find('ul>li').length; i++) {
                pointList += "<li class='ytl_pointList'></li>";
            }
            $this.find('.ytl_pointLists').append(pointList);
            $this.find(".ytl_pointLists>li").eq(0).addClass("ytl_pointActive");
        }
        else {
            $this.children('.ytl_pointLists').remove();
        }
    }
    function isCreateImg(createImg, $this) {
        if (createImg) {
            var smallImgList = "",smallImgListW="";
            for (var i = 0; i < $this.find('ul>li').length; i++) {
                var smallImgCon = $this.find('ul>li').eq(i).find('img').attr('src');
                smallImgList += "<li class='ytl_smallImg' style='background-image: url("+smallImgCon+")'></li>";
            }
            $this.find('.ytl_smallImgList').append(smallImgList);
            $this.find(".ytl_smallImgList>li").eq(0).addClass("ytl_smallImgActive");
            $this.find('.ytl_smallImgList').width();
        }
        else {
            $this.children('.ytl_smallImgList').remove($this.find('ul>li').length*$this.find('ul>li').outerWidth(true));
        }
    }
})(window.jQuery);
