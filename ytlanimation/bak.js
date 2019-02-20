var s = $this.find(".ytl_pointActive").index()+1,
                    time = null,
                    getS=0;
                var ulBox = '.ytl_picCarousel',
                    ulLiBox = '.ytl_picCarousel li',
                    olBox='.ytl_pointLists',
                    olLiBox='.ytl_pointLists li',
                    imgOlBox='.ytl_smallImgList',
                    imgOlLiBox='.ytl_smallImgList li';
                var Lenth = $this.find(ulLiBox).length;
                $this.find(ulLiBox).each(function (index) {
                    $(this).css({
                        'z-index': Lenth - index,
                    })
                });
                if(opts.autoPlay){
                    time = setInterval(function () {
                        animation();
                    }, opts.timer);
                }
                if(!opts.prevNext) $this.find(".ytl_prevNext").remove();
                $this.find(".ytl_next").click(function () {
                    animation();
                });
                $this.find(".ytl_prev").click(function () {
                    var arr = [],lrTop=true;
                    var beforeIndex='',afterIndex='';
                    var clickBox1=".ytl_smallImgList>li",
                        activeClassName1="ytl_smallImgActive",
                        activeClass1=".ytl_smallImgActive";
                    var clickBox=".ytl_pointLists>li",
                        activeClassName="ytl_pointActive",
                        activeClass=".ytl_pointActive",
                        beforeIndex=$this.find(olBox).find(activeClass).index();
                    if(beforeIndex==0){
                        beforeIndex=$this.find(clickBox).length;
                    }
                    var index=beforeIndex-1;
                    $(clickBox).eq(index).addClass(activeClassName).siblings().removeClass(activeClassName);
                    $(clickBox1).eq(index).addClass(activeClassName1).siblings().removeClass(activeClassName1);
                    var afterIndex=$this.find(activeClass).index();
                    s=afterIndex;
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
                        $this.find(ulLiBox).eq(beforeIndex).css({"z-index": Lenth+20});
                        $this.find(ulLiBox).eq(afterIndex).css({"z-index": Lenth+19});
                        clearDiv(afterIndex);
                        s=afterIndex;
                        var arr = [];
                        arr = opts.saveCarousel.split(",");
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
                    if(opts.direction=='horizontal'){
                        if(afterIndex>=opts.showNum-2&&afterIndex<=Lenth-opts.showNum+1){
                            $(imgOlBox).stop(true).animate({"margin-left":(-afterIndex+1)*$(clickBox1).outerWidth(true)},opts.timer/3);
                        }
                        else if(afterIndex<opts.showNum-2&&afterIndex>=-1){
                            $(imgOlBox).stop(true).animate({"margin-left":0},opts.timer/3);
                        }
                        else{
                            $(imgOlBox).stop(true).animate({"margin-left":(-Lenth+opts.showNum)*$(clickBox1).outerWidth(true)},opts.timer/3);
                        }
                    }else {
                        if(afterIndex>=opts.showNum-2&&afterIndex<=Lenth-opts.showNum+1){
                            $(imgOlBox).stop(true).animate({"margin-top":(-afterIndex+1)*$(clickBox1).outerHeight(true)},opts.timer/3);
                        }
                        else if(afterIndex<opts.showNum-2&&afterIndex>=-1){
                            $(imgOlBox).stop(true).animate({"margin-top":0},opts.timer/3);
                        }
                        else{
                            $(imgOlBox).stop(true).animate({"margin-top":(-Lenth+opts.showNum)*$(clickBox1).outerHeight(true)},opts.timer/3);
                        }
                    }
                });
                /*创建点*/
                isCreatePoint(opts,$this);
                isCreateImg(opts,$this);
                clickHover();
                moseHover(opts, $this, time, animation);
                $this.find(ulLiBox).eq(0).css({'opacity': '1'}).siblings().css({'opacity': '0'});
                function animation() {
                    var ulLiBox = '.ytl_picCarousel li';
                    $this.find(ulLiBox).each(function () {
                        var imgCon = $(this).find('img').attr('src');
                        $(this).html('');
                        $(this).append("<img src=" + imgCon + " alt=''>");
                    });
                    var arr = [];
                    arr = opts.saveCarousel.split(",");
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
                    if(opts.createImg) {
                        if(opts.direction=='horizontal'){
                            if(s>=opts.showNum-1&&s<=Lenth-opts.showNum+1){
                                $(imgOlBox).stop(true).animate({"margin-left":(-s+2)*$(imgOlLiBox).outerWidth(true)},opts.timer/3);
                            }
                            else if(s<opts.showNum-1){
                                $(imgOlBox).stop(true).animate({"margin-left":0},opts.timer/3);
                            }
                            else {
                                $(imgOlBox).stop(true).animate({"margin-left":(-Lenth+opts.showNum)*$(imgOlLiBox).outerWidth(true)},opts.timer/3);
                            }
                        }
                        else {
                            $(imgOlBox).parent().addClass('ytl_smallImgLists_vertical');
                            $(imgOlBox).parent().width($(imgOlBox).find('li').outerWidth(true));
                            $(imgOlBox).parent().height($(imgOlBox).find('li').outerHeight(true)*opts.showNum);
                            if(s>=opts.showNum-1&&s<=Lenth-opts.showNum+1){
                                $(imgOlBox).stop(true).animate({"margin-top":(-s+2)*$(imgOlLiBox).outerHeight(true)},opts.timer/3);
                            }
                            else if(s<opts.showNum-1){
                                $(imgOlBox).stop(true).animate({"margin-top":0},opts.timer/3);
                            }
                            else {
                                $(imgOlBox).stop(true).animate({"margin-top":(-Lenth+opts.showNum)*$(imgOlLiBox).outerHeight(true)},opts.timer/3);
                            }
                        }
                    }
                }
                var lrTop=true;
                /*淡入淡出*/
                function fade() {
                    var eqNum=s-1;
                    s++;
                    if (s >= Lenth) {
                        s = 0;
                    }
                    $this.find(ulLiBox).animate({'opacity': '0'}, opts.timer * (2 / 3));
                    $this.find(ulLiBox).eq(s).stop(true,true).animate({'opacity': '1'}, opts.timer * (2 / 3));
                    clearDiv(eqNum);
                    initialize();
                }
                /*层次移动*/
                function diagonalStrips(ids,id) {
                    var eqNum=s-1;
                    switch (ids) {
                        case 1:
                            createDiv(1,s);
                            s++;
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
                                $this.find(ulLiBox).eq(s-1).find('.ytl_imgActive').eq(i-1).stop(true).animate({'left':left},opts.timer);
                            }
                            break;
                        case 2:
                            createDiv(2,s);
                            s++;
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
                                $this.find(ulLiBox).eq(s-1).find('.ytl_imgActive').eq(i-1).stop(true).animate({'top':top},opts.timer);
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
                    s++;
                    if (s >= Lenth) {
                        s = 0;
                    }
                    for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                        if(lrTop){
                            var change={};
                            (divIndex % 2 == 0)?change={'width': '0'}:change={'left': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(divIndex).stop(true).animate(change, opts.timer);
                        }
                        else{
                            var change={};
                            (divIndex % 2 == 0)?change={'height': '0'}:change={'top': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(s - 1).find('.ytl_imgActive').eq(divIndex).stop(true).animate(change, opts.timer);
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
                    s++;
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
                            s++;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            var move = -$this.find(ulLiBox).outerWidth();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(s - 1).stop(true).animate({'left': move + 'px'}, opts.timer * (2 / 3));
                            break;
                        case 2:
                            s++;
                            if (s >= Lenth) {
                                s = 0;
                            }
                            var move = -$this.find(ulLiBox).outerHeight();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(s - 1).stop(true).animate({'top': move + 'px'}, opts.timer * (2 / 3));
                            break;
                    }
                    clearDiv(eqNum);
                    initialize();
                }
                /*初始化设置*/
                function initialize() {
                    $this.find(ulLiBox).css({'opacity': '1'});
                    $this.find(ulLiBox).css({'top': 0,'left':0});
                    $this.find(olLiBox).eq(s).addClass('ytl_pointActive').siblings().removeClass('ytl_pointActive');
                    $this.find(imgOlLiBox).eq(s).addClass('ytl_smallImgActive').siblings().removeClass('ytl_smallImgActive');
                    $this.find(ulLiBox).each(function (index) {
                        $(this).css({
                            'z-index': Lenth - index,
                        })
                    });
                    $this.find(ulLiBox).eq(s-1).css({"z-index": Lenth+20});
                    $this.find(ulLiBox).eq(s).css({"z-index": Lenth+19});
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
                /*点点和图片的点击或移入*/
                function clickHover() {
                    var arr = [],lrTop=true;
                    var beforeIndex='',afterIndex='';
                    var clickBox1=".ytl_smallImgList>li",
                        activeClassName1="ytl_smallImgActive",
                        activeClass1=".ytl_smallImgActive";
                    var clickBox=".ytl_pointLists>li",
                        activeClassName="ytl_pointActive",
                        activeClass=".ytl_pointActive";
                    $this.find("ol>li").on(opts.clickHover,function () {
                        beforeIndex=$this.find(activeClass).index();
                        var index=$(this).index();
                        $(clickBox).eq(index).addClass(activeClassName).siblings().removeClass(activeClassName);
                        $(clickBox1).eq(index).addClass(activeClassName1).siblings().removeClass(activeClassName1);
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
                            $this.find(ulLiBox).eq(beforeIndex).css({"z-index": Lenth+20});
                            $this.find(ulLiBox).eq(afterIndex).css({"z-index": Lenth+19});
                            clearDiv(afterIndex);
                            s=afterIndex;
                            var arr = [];
                            arr = opts.saveCarousel.split(",");
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
                        if(opts.direction=='horizontal'){
                            if(afterIndex>=opts.showNum-1&&afterIndex<=Lenth-opts.showNum+1){
                                $(imgOlBox).stop(true).animate({"margin-left":(-afterIndex+2)*$(clickBox1).outerWidth(true)},opts.timer/3);
                            }
                            else if(afterIndex<opts.showNum-1){
                                $(imgOlBox).stop(true).animate({"margin-left":0},opts.timer/3);
                            }
                            else{
                                $(imgOlBox).stop(true).animate({"margin-left":(-Lenth+opts.showNum)*$(clickBox1).outerWidth(true)},opts.timer/3);
                            }
                        }else {
                            if(afterIndex>=opts.showNum-1&&afterIndex<=Lenth-opts.showNum+1){
                                $(imgOlBox).stop(true).animate({"margin-top":(-afterIndex+2)*$(clickBox1).outerHeight(true)},opts.timer/3);
                            }
                            else if(afterIndex<opts.showNum-1){
                                $(imgOlBox).stop(true).animate({"margin-top":0},opts.timer/3);
                            }
                            else{
                                $(imgOlBox).stop(true).animate({"margin-top":(-Lenth+opts.showNum)*$(clickBox1).outerHeight(true)},opts.timer/3);
                            }
                        }
                    });
                }
                function clickFade(beforeIndex) {
                    $this.find(ulLiBox).eq(beforeIndex).stop(true,true).animate({'opacity': 0}, opts.timer * (2 / 3));
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
                                $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(i-1).stop(true).animate({'left':left},opts.timer);
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
                                $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(i-1).stop(true).animate({'top':top},opts.timer);
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
                            $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(divIndex).stop(true).animate(change, opts.timer);
                        }
                        else{
                            var change={};
                            (divIndex % 2 == 0)?change={'height': '0'}:change={'top': $(ulLiBox).width() + 'px'};
                            $this.find(ulLiBox).eq(beforeIndex).find('.ytl_imgActive').eq(divIndex).stop(true).animate(change, opts.timer);
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
                            $this.find(ulLiBox).eq(beforeIndex).stop(true).animate({'left': move + 'px'}, opts.timer * (2 / 3));
                            break;
                        case 2:
                            move = -$this.find(ulLiBox).outerHeight();
                            (id == 1) ? move = move : move = -move;
                            $this.find(ulLiBox).eq(beforeIndex).stop(true).animate({'top': move + 'px'}, opts.timer * (2 / 3));
                            break;
                    }
                }