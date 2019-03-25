<template>
  <div id="app">
    <Header :banner="bannerLists" :nav_center="nav_center" :main_nav="main_nav_list"></Header>
    <router-view
      :config="config"
      :main_nav="main_nav_list"
      :home_view="home_view"
      :hobby_lists="hobby_lists"
      :collect_lists="collect_lists"
      :fullHeight="fullHeight"
      :intro_lists="intro_lists"
    ></router-view>
    <Footer :config="config"></Footer>
  </div>
</template>

<script>
  import Header from './components/public/Header'
  import Footer from './components/public/Footer'
  export default {
  name: 'App',
  components:{ Header,Footer },
    data(){
      return{
          header:null,
          apiUrl:null,
          imgUrl:null,
          api: [
              {'apiUrl':'/banner'},//banner
              {'apiUrl':'/system'},//系统配置
              {'apiUrl':'/main_nav'},//一级导航
              {'apiUrl':'/hometown'},//家乡旅游
              {'apiUrl':'/hobby'},//兴趣爱好
              {'apiUrl':'/collect'},//收藏
              {'apiUrl':'/intro'},//简历信息
          ],
          nav_center:true,
          bannerLists: [],
          /*系统配置*/
          config:{},
          /*一级导航*/
          main_nav_list:[],
          home_view:[],
          hobby_lists:[],
          collect_lists:[],
          intro_lists:[],
          fullHeight: document.documentElement.clientHeight*0.8,
      }
    },
    created(){
      window.addEventListener('scroll', this.handleScroll);
      this.header=this.mainConfig.httpConfig().headers;
      this.imgUrl=this.mainConfig.imgUrl;
      this.apiUrl=this.mainConfig.apiUrl;
      /*this.apiUrl='/api';*/
      /*this.index_banner(0);
      this.system(1);
      this.mainNav(2);
      this.home(3);
      this.hobby(4);
      this.collect(5);
      this.intro(6);*/
      this.get_date(0);
      this.get_date(1);
      this.get_date(2);
      this.get_date(3);
      this.get_date(4);
      this.get_date(5);
      this.get_date(6);
    },
    methods:{
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var bannerH = document.getElementById("banner").offsetHeight;
        if (scrollTop > bannerH - 60) {
          this.nav_center = false;
        } else {
          this.nav_center = true;
        }
      },
      get_date(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res) => {
            if(index==0)$this.bannerLists=res.data.data;
            if(index==1)$this.config=res.data.data;
            if(index==2)$this.main_nav_list=res.data.data;
            if(index==3)$this.home_view=res.data.data;
            if(index==4)$this.hobby_lists=res.data.data;
            if(index==5)$this.collect_lists=res.data.data;
            if(index==6)$this.intro_lists=res.data.data;
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
    /*/!*排序*!/
    computed: {
      index_yyxwOrder() {
        return this.index_yyxw.sort((a,b)=>b.id-a.id);
      },
    },*/
    watch:{
      $route(to,from){
        if(to.path.search('intro')!==-1){
          var name=prompt("","请输入密码");
          if (name!='qingshurumima') {
            window.location.href='/';
          }
        }
      }
    },
}
</script>

<style lang="scss">
  @font-face {
    font-family: "李旭科书法";
    src: url("font/lxksf.ttf");
    font-weight: normal;
    font-style: normal;
  }
  /*base*/
  *{
    margin:0;
    padding:0;
    list-style-type:none;
  }
  body,div,ul,li,form,input,textarea,span,a,i,dl,dt,dd,h1,h2,h3,h4,h5,h6{
    margin:0;
    padding:0;
  }
  ul,ol,dl,dt,dd,ol,li{
    list-style:none;
    list-style-type:none;
  }
  h1,h2{
    font-weight:bold;
  }
  body,html{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    font-family: "李旭科书法";
    font-size: 16px;
    color: #d2650d;
    letter-spacing: 4px;
  }
  img{
    vertical-align: middle;
  }
  a{
    color: #d2650d;
    display: block;
    cursor: pointer;
    text-decoration: none;
  }
  input,select,option,textarea,img{
    border: none;
    outline: none;
  }
  /*clearFix*/
  .clearFix:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  /*line hide*/
  .selectBg {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding-right: 14px;
    padding-left: 10px; }
  /*很关键：将默认的select选择框样式清除,并添加padding为下拉小箭头留出一点位置，避免被文字覆盖*/
  .selectBg::-ms-expand {
    display: none; }
  .oneLine{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #cccccc; }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #cccccc; }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #cccccc; }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #cccccc; }
    body,html{
      min-width: 1200px;
    }
    /*content*/
    .fl{
      float: left;
    }
    @mixin tstAll($timer:0.5s){
      -webkit-transition: all $timer;
      -moz-transition: all $timer;
      -ms-transition: all $timer;
      -o-transition: all $timer;
      transition: all $timer;
    }
    @mixin wordD(){
      writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
      writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
    }
    @mixin gundonging($wait:gundong1 linear 5s normal running){
      -webkit-animation: $wait;
      -o-animation: $wait;
      animation: $wait;
      animation-fill-mode: forwards;
    }
    .imgHover img:hover{
      -webkit-transform: scale(1.05);
      -moz-transform: scale(1.05);
      -ms-transform: scale(1.05);
      -o-transform: scale(1.05);
      transform: scale(1.05); }
    .imgHover img{
      @include tstAll();
    }
    .content{
      .bg{
        position: absolute;
        width: 72px;
        height: 72px;
        top: 88px;
      }
    }
    .common,.i_common{
      width: 1200px;
      position: absolute;
      z-index: 20;
      background: #f5f5f5;
      left: 0;
      right: 0;
      top: 50%;
      opacity: 0;
      @include tstAll(1s);
      &.show{
        opacity: 1;
        top: 50%;
        margin: 0 auto;
      }
    }
    .i_common{
      top: 100%;
    }
    .footer{
      font-size: 18px;
      padding: 20px 0;
      margin-top: -60px;
      text-align: center;
      position: relative;
    }
    .header{
      position: relative;
    }
    .main_nav{
      position: fixed;
      top: 30px;
      right: 0;
      z-index: 60;
      li{
        font-size: 20px;
        padding: 0 20px;
        font-weight: bold;
        display: inline-block;
        & .on{
          color: #4ea045;
        }
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 92px;
      height: 92px;
      font-size: 42px;
      line-height: 70px;
      border-radius: 50%;
      padding: 14px;
      color: #d2650d;
      letter-spacing: -4px;
    }
    .part1{
      position: relative;
      height: 100%;
      .title{
        &:before{
          content: "腾冲";
          width: 20px;
          font-size: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -8px 0 0 18px;
          line-height: 20px;
          color: #50a76b;
          text-shadow: 0 2px 4px #ffffff;
        }
      }
      .lists {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.04) url(./assets/bg.png) no-repeat left bottom;
        background-size: auto 85%;
        .desc{
          line-height: 44px;
          letter-spacing: 12px;
          font-size: 22px;
          position: absolute;
          left: 180px;
          top: 40px;
          color: #d2650d;
          @include wordD;
        }
      }
      .img{
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .con{
        float: right;
        width: 648px;
        a{
          width: 319px;
          height: 230px;
          overflow: hidden;
          float: left;
          border-right: 5px solid #f5f5f5;
          border-top: 5px solid #f5f5f5;
          background-size: cover;
          background-position: center;
          &:hover{
            dl{
              -webkit-transform: scale(1);
              -moz-transform: scale(1);
              -ms-transform: scale(1);
              -o-transform: scale(1);
              transform: scale(1);
            }
          }
        }
        dl{
          min-height: 150px;
          padding: 40px;
          background: rgba(255,255,255,0.5);
          font-size: 20px;
          text-align: center;
          color: #d2650d;
          -webkit-transform: scale(0);
          -moz-transform: scale(0);
          -ms-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          @include tstAll(0.3s);
        }
        dt{
          font-size: 22px;
        }
        dd{
          &:before{
            content: "";
            width: 60px;
            height: 1px;
            display: block;
            margin: 20px auto 10px;
            background: #d2650d;
          }
        }
      }
    }
    .part2{
      position: relative;
      height: 120px;
      border-radius: 120px;
      .title{
        background: #ffffff;
        text-align: center;
        line-height: 92px;
        z-index: 1;
        border: 1px solid;
        position: relative;
      }
      .tit{
        position: absolute;
        top: 23px;
        left: 12px;
        width: 80px;
        height: 80px;
        padding: 8px;
        font-size: 22px;
        border-radius: 50%;
        background: #d02f20;
        text-align: center;
        line-height: 80px;
        z-index: 0;
        color: #961f1f;
        background-size: cover;
      }
      .tit1{
        @include gundonging(gundong1 1s linear normal running);
      }
      .tit2{
        @include gundonging(gundong2 1s linear 1s normal running);
      }
      .tit3{
        @include gundonging(gundong3 1s linear 2s normal running);
      }
      .tit4{
        @include gundonging(gundong4 1s linear 3s normal running);
      }
      .tit5{
        @include gundonging(gundong5 1s linear 4s normal running);
      }
      .tit6{
        @include gundonging(gundong6 1s linear 5s normal running);
      }
    }
    .part3{
      margin: 70px 40px;
      line-height: 30px;
      .tit{
        font-size: 26px;
        margin-bottom: 30px;
      }
      .con{
        text-indent: 2em;
        font-size: 18px;
        line-height: 50px;
      }
    }
    .part4{
      margin: 40px;
    }
    .single{
      background: none;
    }
    .page_intro{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 600px;
      margin: 0 auto;
      border-radius: 16px;
      font-family: "微软雅黑";
      color: #464646;
      overflow: hidden;
      -webkit-box-shadow: inset -1px -1px 1px rgba(0,0,0,0.4);
      -moz-box-shadow: inset -1px -1px 1px rgba(0,0,0,0.4);
      box-shadow: inset -1px -1px 1px rgba(0,0,0,0.4);
      background: linear-gradient(#ffffff,#d2650d);
      -webkit-transform: skewX(6deg);
      -moz-transform: skewX(6deg);
      -ms-transform: skewX(6deg);
      -o-transform: skewX(6deg);
      transform: skewX(6deg);
      .click_tag{
        width: 50px;
        height: 67px;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
        background: url("./assets/sb.png") no-repeat center;
      }
      &:nth-of-type(1){
        /*z-index: 0 !important;*/
        background: url("./assets/xsp.png") no-repeat center,url("./assets/jp.png") no-repeat left top,linear-gradient(#ffffff,#d2650d);
        .con{
          margin: 222px 112px;
          font-size: 22px;
          line-height: 50px;
          span{
            font-weight: bold;
            color: #d2650d;
          }
        }
        .img{
          width: 108px;
          height: 141px;
          overflow: hidden;
          position: absolute;
          right: 98px;
          top: 208px;
          z-index: -1;
          background: #f5f5f5;
        }
        .tit{
          position: absolute;
          top: 60px;
          right: 86px;
          font-size: 35px;
          font-weight: bold;
        }
      }
      .con {
        margin: 40px;
        line-height: 30px;
      }
      .top{
        font-size: 20px;
        padding: 14px 0;
        border-bottom: 1px solid #d2650d;
      }
      .down{
        margin: 0 10px 20px;
        table{
          margin-left: -52px;
        }
        td{
          padding-left: 52px;
        }
        .tit{
          height: 30px;
          margin-left: -60px;
          p{
            float: left;
            &:before{
              content: "";
              display: inline-block;
              padding-left: 60px;
            }
          }
        }
        a{
          display: inline-block;
          min-width: 204px;
        }
      }
      &.on{
        -webkit-transform: skewX(0);
        -moz-transform: skewX(0);
        -ms-transform: skewX(0);
        -o-transform: skewX(0);
        transform: skewX(0);
        top: 0 !important;
        left: auto !important;
      }
      &.prev_page{
        right: auto;
        z-index: 2 !important;
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
      }
      &.next_page{
        right: auto;
        .click_tag{
          left: 0;
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
          -ms-transform: rotateY(180deg);
          -o-transform: rotateY(180deg);
          transform: rotateY(180deg);
        }
      }
    }
    .more{
      position: absolute;
      bottom: 90px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 50px;
      height: 50px;
      cursor: pointer;
      background-image: url(./assets/more.png);
      background-blend-mode: lighten;
      background-size: cover;
      @include gundonging(more 0.8s linear infinite normal running);
    }
    .other_page {
      .common{
        opacity: 1;
        margin: -310px auto 0;
      }
      .bg{
        position: absolute;
        top: 24px;
        left: 24px;
      }
    }
    .o_lists {
      margin: 40px;
      overflow-y: scroll;
      ul{
        column-count: 3;
        column-gap: 0;
      }
      img{
        width: 100%;
      }
      li{
        break-inside: avoid;
        padding: 5px;
      }
    }
    .o_lists{
      &::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
        width:0;
        height:0;
      }
    }
    @keyframes gundong1 {
      0%{
        left: 12px;
      }
      100%{
        left: 184px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes gundong2 {
      0%{
        left: 12px;
      }
      100%{
        left: 368px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes gundong3 {
      0%{
        left: 12px;
      }
      100%{
        left: 552px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes gundong4 {
      0%{
        left: 12px;
      }
      100%{
        left: 736px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes gundong5 {
      0%{
        left: 12px;
      }
      100%{
        left: 920px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes gundong6 {
      0%{
        left: 12px;
      }
      100%{
        left: 1104px;
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
    }
    @keyframes more {
      0%{
        opacity: 1;
        bottom: 50px;
      }
      100%{
        opacity: 0.5;
        bottom: 70px;
      }
    }
  .pc{
    display: block;
  }
  .web_app{
    display: none;
  }
  @media (min-width: 320px) and (max-width: 751px){
    .pc{
      display: none;
    }
    .web_app{
      display: block;
    }
    body,html{
      min-width: auto;
      font-size: 10pt;
    }
    .banner{
      height: 100% !important;
      position: fixed !important;
      width: 100% !important;
      top: 0;
    }
    .main_nav {
      top: 10pt;
      li{
        padding: 0 6pt;
        font-size: 12pt;
      }
    }
    .fade ul li .desc{
      font-size: 10pt !important;
      margin-top: -10pt !important;
    }
    .more{
      width: 26pt;
      height: 26pt;
      bottom: 20pt;
      z-index: 30;
      background-size: 100%;
    }
    .content{
      width: 100%;
      height: 100%;
    }
    .common, .i_common{
      width: 100%;
      height: 100% !important;
      overflow: hidden;
    }
    .title {
      top: 44pt;
      left: 0;
      width: 80pt;
      height: auto;
      font-size: 28pt;
      line-height: 40pt;
      &:before {
        width: 12pt;
        font-size: 12pt;
        margin: 6pt 0 0 4pt;
        line-height: 10pt;
      }
    }

    .part1 .lists {
      background: rgba(0,0,0,.04) url('./assets/bg.png') no-repeat left bottom;
      background-size: auto 50%;
      .desc{
        line-height: 30pt;
        letter-spacing: 10pt;
        font-size: 15pt;
        top: 90pt;
        right: 0;
        left: auto;
      }
    }
    .part1 .con{
      width: 100%;
      height: 100%;
      a{
        width: 50%;
        height: 50%;
        border: none;
        -webkit-box-shadow: 0 0 0 4px #f5f5f5;
        -moz-box-shadow: 0 0 0 4px #f5f5f5;
        box-shadow: 0 0 0 4px #f5f5f5;
      }
      dl {
        padding: 16% 6%;
        min-height: 78%;
        font-size: 13pt;
      }
      dt{
        font-size: 15pt;
      }
      dd:before {
        width: 50pt;
        margin: 18pt auto 10pt;
      }
    }
    .part2 {
      top: 50pt;
      .tit {
        position: relative;
        display: inline-block;
        top: 0;
        left: 0;
        width: 30%;
        height: 80%;
        margin: 5% 10%;
        padding: 0;
        font-size: 16pt;
      }
    }
    .part3 {
      margin: 50pt 14pt;
      .tit{
        font-size: 15pt;
        margin-bottom: 10pt;
      }
      .con{
        font-size: 14pt;
        line-height: 20pt;
      }
    }
    .other_page .bg {
      top: auto;
      left: auto;
      bottom: 0;
    }
    .other_page .common{
      overflow: scroll;
    }
    .o_lists{
      margin: 40px 14pt;
      ul {
        -webkit-column-count: 2;
        column-count: 2;
        -webkit-column-gap: 0;
        column-gap: 0;
      }
      li{
        padding: 4pt;
      }
    }
    .page_intro{
      width: 100%;
      height: 100%;
      position: relative;
      left: 0 !important;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      -webkit-transform: none;
      -moz-transform: none;
      -ms-transform: none;
      -o-transform: none;
      transform: none;
      border-radius: 0;
    }
    .page_intro:nth-of-type(1) {
      height: 100%;
      background-size: 92%,40%,100%;
      .con {
        margin: 104pt 24pt;
        font-size: 12pt;
        line-height: 24pt;
        .desc{
          position: relative;
        }
      }
      .img {
        width: 54pt;
        height: 70pt;
        right: 26pt;
        top: 102pt;
        z-index: 0;
        img{
          width: 100%;
        }
      }
    }
    .page_intro2{
      height: auto;
      .con{
        line-height: 22pt;
        margin: 50pt 10pt;
      }
      .down {
        table{
          margin-left: -18pt;
        }
        td {
          padding-left: 18pt;
        }
      }
    }
    @keyframes more {
      0%{
        bottom: 20pt;
      }
      100%{
        bottom: 30pt;
      }
    }
  }

  </style>
