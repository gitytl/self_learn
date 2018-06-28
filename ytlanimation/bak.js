(function ($) {
    $.fn.extend({
        //轮播图(banner)
        "picAnimation": function (options) {
            var $Li = ".ytl_picCarousel>li";//获取轮播图大图展示的li
            var $LiImg = 'img';//获取大图li展示的图片标签
            var $BigImgBox = ".ytl_bigImg";//存放缩略图的ol
            var $BigImg = ".ytl_bigImg li";//获取缩略图的li
            var $BigImgActive = "ytl_bigImgActive";//当前缩略图添加的类名
            if (!isValid) {
                return this
            }
            if (options) {
                var opts = $.extend({}, defaluts, options);
            }
            else {
                var opts = $.extend({}, defaluts);
            }
            return this.each(function () {
                var $this = $(this);
                var s = 0;
                var nums = 1;
                var timer = null, timeAgain = null;
                for (var i = 0; i < $this.find($Li).length; i++) {
                    $this.find($Li).eq(i).css({
                        zIndex: $this.find($Li).length - i
                    });
                }
                /*var j = 0;*/
                var arr = [];
                arr = opts.deleteCarousel.split(",");

                createImg(opts.createImg, $this);
                isCreatePoint(opts.createPoint, $this);
                createPrevNext(opts.createPrevNext, $this);

                function move(id) {
                    (id == "next") ? s++ : s--;
                    (id == "prev") ? nums = -1 : nums = nums;
                    if (s > $this.find($Li).length - 1) {
                        s = 0;
                    }
                    if (s < -1) {
                        s = $this.find($Li).length - 2;
                        /*$($BigImgBox).css({left:$($BigImg).length-opts.showNum});*/
                    }
                    if ($($BigImg).length > opts.showNum) {
                        if (id == "next") {
                            if (s > opts.showNum - 2) {

                                if (s == $($BigImg).length - 1) {
                                    $($BigImgBox).stop(true, true).animate({
                                        left: -$($BigImg).outerWidth(true) * ($($BigImg).length - opts.showNum)
                                    }, opts.timer / opts.showNum);
                                }
                                else {
                                    $($BigImgBox).stop(true, true).animate({
                                        left: -$($BigImg).outerWidth(true) * (s - (opts.showNum - 2))
                                    }, opts.timer / opts.showNum);
                                }
                            }
                            else {
                                $($BigImgBox).stop(true, true).animate({left: 0}, opts.timer * 2 / $($BigImg).length);
                            }
                        } else {
                            console.log(s);
                            if (s >= 0) {
                                if (s <= 2) {
                                    $($BigImgBox).stop(true, true).animate({left: 0}, opts.timer * 2 / $($BigImg).length);
                                } else {
                                    $($BigImgBox).stop(true, true).animate({
                                        left: -$($BigImg).outerWidth(true) * (s - (opts.showNum - 1))
                                    }, opts.timer / opts.showNum);
                                }
                            } else {
                                $($BigImgBox).stop(true, true).animate({
                                    left: -$($BigImg).outerWidth(true) * ($($BigImg).length - opts.showNum)
                                }, opts.timer / opts.showNum);
                            }
                        }
                    }
                    for (var i = 0; i < $this.find($Li).length; i++) {
                        $this.find($Li).eq(i).css({
                            zIndex: $this.find($Li).length - i
                        });
                        var imgCon = $this.find($Li).eq(i).find($LiImg).attr('src');
                        $this.find($Li).eq(i).html('');
                        $this.find($Li).eq(i).append("<img src=" + imgCon + " alt=''>");
                    }
                    $this.find($Li).eq(s - nums).css({
                        zIndex: 20
                    });
                    $this.find($Li).eq(s).css({
                        zIndex: 19
                    });
                    /*if (s < $this.find('.picCarousel>li').length + 1) {
                     var num = Math.ceil(Math.random() * 13);
                     }*/
                    /*数组比较取出不相同的值存放在数组arr3中*/
                    var arr3 = [];
                    var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
                    for (var i = 0; i < arr1.length; i++) {
                        var stra = arr1[i];
                        var count = 0;
                        for (var j = 0; j < arr.length; j++) {
                            var strb = arr[j];
                            if (stra == strb) {
                                count++;
                            }
                        }
                        if (count == 0) {//表示数组1的这个值没有重复的，放到返回列表中
                            arr3.push(stra);
                        }
                    }
                    //随机取出数组中的元素
                    var index = Math.floor((Math.random() * arr3.length));
                    switch (arr3[index]) {
                        /**/
                        case 1:
                            fadeCarousel();
                            break;
                        case 2:
                            all(1, 1);
                            break;
                        case 3:
                            all(1, 2);
                            break;
                        case 4:
                            all(2, 1);
                            break;
                        case 5:
                            all(2, 2);
                            break;
                        case 6:
                            diagonalStrips(1, 1);
                            break;
                        case 7:
                            diagonalStrips(1, 2);
                            break;
                        case 8:
                            diagonalStrips(2, 1);
                            break;
                        case 9:
                            diagonalStrips(2, 2);
                            break;
                        case 10:
                            cross(1);
                            break;
                        case 11:
                            cross(2);
                            break;/**/
                        case 12:
                            grid(1);
                            break;
                        case 13:
                            grid(2);
                            break;
                    }
                }

                if (opts.autoPlay) {
                    timeAgain = setInterval(function () {
                        move("next");
                    }, opts.timer);
                }
                pointClick($this);
                /*prevNextClick($this);*/
                moseHover(opts, $this, timeAgain, move);
                $($BigImg).width($this.width() / opts.showNum - 2);
                $($BigImgBox).width($($BigImg).length * $($BigImg).outerWidth(true));

                function clearCss() {
                    $this.find('.ytl_picCarousel>li,.ytl_picCarousel>li .ytl_imgActive').css({
                        top: 0,
                        left: 0,
                        opacity: 1
                    });
                    $this.find('.ytl_picCarousel>li .ytl_imgActive').css({
                        left: 0,
                        top: 0
                    });
                }

                function addPointClass() {
                    $this.find(".ytl_pointLists>li").eq(s).addClass("ytl_pointActive").siblings().removeClass("ytl_pointActive");
                    $this.find(".ytl_bigImg>li").eq(s).addClass($BigImgActive).siblings().removeClass($BigImgActive);
                }

                /*淡入淡出动画*/
                function fadeCarousel() {
                    /*carouselPublic();*/
                    clearCss();
                    $this.find($Li).eq(s - nums).stop(true, true).animate({opacity: 0}, opts.timer);
                    addPointClass();
                }

                /*整块移动动画*/
                function all(ids, id) {//ids 为1向左右，为2向上下；id为1向左和上，为2向右和下
                    /*carouselPublic();*/
                    clearCss();
                    switch (ids) {
                        case 1:
                            if (id == 1) {
                                $this.find($Li).eq(s - nums).stop(true, true).animate({
                                    left: -$this.width()
                                }, opts.timer);
                            }
                            else {
                                $this.find($Li).eq(s - nums).stop(true, true).animate({
                                    left: $this.width()
                                }, opts.timer);
                            }
                            addPointClass();
                            break;
                        case 2:
                            if (id == 1) {
                                $this.find($Li).eq(s - nums).stop(true, true).animate({
                                    top: -$this.height()
                                }, opts.timer);
                            }
                            else {
                                $this.find($Li).eq(s - nums).stop(true, true).animate({
                                    top: $this.height()
                                }, opts.timer);
                            }
                            addPointClass();
                            break;
                    }
                }

                /*先后移动动画*/
                function diagonalStrips(ids, id) {//ids 为1向左右，为2向上下；id为1向左和上，为2向右和下
                    /*carouselPublic();*/
                    clearCss();
                    switch (ids) {
                        case 1:
                            createDiv(1);
                            for (var j = 0; j < $this.find($Li).eq(s - nums).find('.ytl_imgActive').length; j++) {
                                if (id == 1) {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(j).stop(true, true).animate({
                                        left: -($this.width() + ($this.find($Li).eq(s - nums).find('.ytl_imgActive').length - j - 1) * $this.find($Li).eq(s - nums).find('.ytl_imgActive').height())
                                    }, opts.timer);
                                }
                                else {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(j).stop(true, true).animate({
                                        left: $this.width() + ($this.find($Li).eq(s - nums).find('.ytl_imgActive').length - j - 1) * $this.find($Li).eq(s - nums).find('.ytl_imgActive').height()
                                    }, opts.timer);
                                }
                            }
                            addPointClass();
                            break;
                        case 2:
                            createDiv(2);
                            for (var j = 0; j < $this.find($Li).eq(s - nums).find('.ytl_imgActive').length; j++) {
                                if (id == 1) {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(j).stop(true, true).animate({
                                        top: $this.height() + ($this.find($Li).eq(s - nums).find('.ytl_imgActive').length - j - 1) * $this.find($Li).eq(s - nums).find('.ytl_imgActive').width()
                                    }, opts.timer);
                                }
                                else {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(j).stop(true, true).animate({
                                        top: -($this.height() + ($this.find($Li).eq(s - nums).find('.ytl_imgActive').length - j - 1) * $this.find($Li).eq(s - nums).find('.ytl_imgActive').width())
                                    }, opts.timer);
                                }
                            }
                            addPointClass();
                            break;
                    }

                }

                /*交叉动画*/
                function cross(ids) {
                    /*carouselPublic();*/
                    clearCss();
                    switch (ids) {
                        case 1:
                            createDiv(1);
                            $this.find('.ytl_picCarousel>li .ytl_imgActive').css({
                                width: '100%'
                            });
                            for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                                if (divIndex % 2 == 1) {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate({'width': '0'}, opts.timer);
                                } else {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate({
                                        'left': $this.find('.ytl_imgActive').width() + 'px'
                                    }, opts.timer);
                                }
                            }
                            addPointClass();
                            break;
                        case 2:
                            createDiv(2);
                            $this.find('.ytl_picCarousel>li .ytl_imgActive').css({
                                height: '100%'
                            });
                            for (var divIndex = 0; divIndex < $this.find('.ytl_imgActive').length; divIndex++) {
                                if (divIndex % 2 == 1) {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate({'height': '0'}, opts.timer);
                                } else {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(divIndex).stop(true, true).animate({
                                        'top': $this.find('.ytl_imgActive').height() + 'px'
                                    }, opts.timer);
                                }
                            }
                            addPointClass();
                            break;
                    }
                }

                /**/

                /*格子动画*/
                function grid(ids) {
                    /*carouselPublic();*/
                    clearCss();
                    createDiv(3);
                    var imgActiveL = $this.find($Li).eq(s - nums).find('.ytl_imgActive').length;

                    for (var divIndex = 0; divIndex < imgActiveL; divIndex++) {
                        switch (ids) {
                            case 1:
                                $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(2 * divIndex).stop(true, true).animate({
                                    'width': '0px'
                                }, opts.timer / 3, function () {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').stop(true, true).animate({
                                        'width': '0px'
                                    }, opts.timer / 3);
                                });
                                addPointClass();
                                break;
                            case 2:
                                var marinL = parseInt($this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(1).css('left')) - parseInt($this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(0).css('left'));
                                $this.find($Li).eq(s - nums).find('.ytl_imgActive').eq(2 * divIndex).stop(true, true).animate({
                                    'width': '0px',
                                    'margin-left': marinL + 'px'
                                }, opts.timer / 3, function () {
                                    $this.find($Li).eq(s - nums).find('.ytl_imgActive').stop(true, true).animate({
                                        'width': '0px',
                                        'margin-left': marinL + 'px'
                                    }, opts.timer / 3);
                                });
                                addPointClass();
                                break;
                        }
                    }
                }

                /*创建div节点*/
                //查找放图片的li
                var liHasImg = $this.find($Li);

                function createDiv(ids) {
                    switch (ids) {
                        //创建水平div
                        case 1:
                            var imgCon = liHasImg.eq(s - nums).find($LiImg).attr('src');
                            liHasImg.eq(s - nums).html('');
                            for (var i = 0; i < opts.divLevelNum; i++) {
                                liHasImg.eq(s - nums).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'width': $this.width(),
                                    'height': $this.height(),
                                    'display': 'block'
                                });

                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'width': '100%',
                                    'height': $this.height() / opts.divLevelNum,
                                    'top': ($this.height() / opts.divLevelNum) * i
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'margin-top': -parseInt(liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css('top'))
                                });
                            }
                            break;
                        //创建垂直div
                        case 2:
                            var imgCon = liHasImg.eq(s - nums).find($LiImg).attr('src');
                            liHasImg.eq(s - nums).html('');
                            for (var i = 0; i < opts.divLevelNum; i++) {
                                liHasImg.eq(s - nums).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'width': $this.width(),
                                    'height': $this.height(),
                                    'display': 'block'
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'width': $this.width() / opts.divVerticalNum,
                                    'height': '100%',
                                    'left': ($this.width() / opts.divVerticalNum) * i
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'margin-left': -parseInt(liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css('left'))
                                });

                            }
                            break;
                        //创建格子div
                        case 3:
                            var divLevelNum3 = Math.ceil(opts.divLevelNum / 2);
                            var divVerticalNum3 = Math.ceil(opts.divVerticalNum / 2);
                            var imgCon = liHasImg.eq(s - nums).find($LiImg).attr('src');
                            liHasImg.eq(s - nums).html('');
                            for (var i = 0; i < divLevelNum3 * divVerticalNum3; i++) {

                                liHasImg.eq(s - nums).append("<div class='ytl_imgActive'><img src=" + imgCon + " alt=''></div>");
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'position': 'absolute',
                                    'overflow': 'hidden'
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'width': $this.width(),
                                    'height': $this.height(),
                                    'display': 'block'
                                });
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                    'width': $this.width() / divVerticalNum3,
                                    'height': $this.height() / divLevelNum3
                                });
                                for (var verticalNum = 0; verticalNum < divVerticalNum3; verticalNum++) {
                                    if ((i + 1) % divLevelNum3 == verticalNum) {
                                        liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                            'left': (verticalNum - 1) * $this.width() / divVerticalNum3 + 'px'
                                        });
                                    }
                                    if ((i + 1) % divLevelNum3 == 0) {
                                        liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                            'left': (divVerticalNum3 - 1) * $this.width() / divVerticalNum3 + 'px'
                                        });
                                    }
                                }
                                for (var levelNum = 0; levelNum < divLevelNum3; levelNum++) {
                                    if (parseInt(i / divLevelNum3) == levelNum) {
                                        liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css({
                                            'top': (levelNum) * ($this.height() / divLevelNum3) + 'px'
                                        });
                                    }
                                }
                                liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).find($LiImg).css({
                                    'margin-left': -parseInt(liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css('left')),
                                    'margin-top': -parseInt(liHasImg.eq(s - nums).find('.ytl_imgActive').eq(i).css('top'))
                                });
                            }
                            break;
                    }
                }

                function pointClick($this) {
                    $this.find(".ytl_pointLists>li,.ytl_bigImg>li").click(function () {
                        nums = $(this).index() - s;
                        s = $(this).index() - 1;
                        move("next");
                        nums = 1;
                    });
                }

                /*function prevNextClick($this) {
                  $this.find(".ytl_next").click(function () {
                    nums=1;
                    move("next");
                  });
                  $this.find(".ytl_prev").click(function () {
                    nums=-1;
                    move("prev");
                  });
                }*/
            });
        }
    });
    /*    function pointClick($this,s,fn){
     $this.find(".pointLists>li").click(function(){
     $(this).addClass("pointActive").siblings().removeClass("pointActive");
     s=$(this).index();
     fn();
     })
     }*/

    /*/!*创建点点*!/
    function isCreatePoint(createPoint, $this) {
        var $PointListsBox = ".ytl_pointLists";//存放点点的ol
        var $UlLiNum = 'ul>li'//找到存放大图的li
        if (createPoint) {
            var pointLists = "<ol class='ytl_pointLists'></ol>";
            $this.append(pointLists);
            var pointList = "";
            for (var i = 0; i < 3; i++) {
                pointList += "<li class='ytl_pointList'></li>";
            }
            $this.find($PointListsBox).append(pointList);
            $this.find(".ytl_pointLists>li").eq(0).addClass("ytl_pointActive");
        }
    }

    /!*创建左右箭头*!/
    function createPrevNext(createPrevNext, $this) {
        var $PrevNextBox = ".ytl_prevNext";//左右箭头的div
        if (createPrevNext) {
            /!*var prevNexts = "<div class='ytl_prevNext'></div>";
             $this.append(prevNexts);*!/
            var prevNext = "<div class='ytl_prev'></div><div class='ytl_next'></div>";
            $this.parent().find($PrevNextBox).append(prevNext);
        }
    }

    /!*创建缩略图*!/
    function createImg(createImg, $this) {
        var $Li = ".ytl_picCarousel>li";//获取轮播图大图展示的li
        var $LiImg = 'img';//获取大图li展示的图片标签
        var $BigImgBox = ".ytl_bigImg";//存放缩略图的ol
        var $BigImg = ".ytl_bigImg li";//获取缩略图的li
        var $BigImgActive = "ytl_bigImgActive";//当前缩略图添加的类名


        if (createImg) {
            var bigImgList = "";
            for (var i = 0; i < $this.find($Li).length; i++) {
                var imgCon = $this.find($Li).eq(i).find($LiImg).attr('src');
                bigImgList += "<li><img src=" + imgCon + " alt=''></li>";
            }
            $this.find($BigImgBox).append(bigImgList);
            $this.find($BigImg).eq(0).addClass($BigImgActive);
        }
    }*/
})(window.jQuery);
