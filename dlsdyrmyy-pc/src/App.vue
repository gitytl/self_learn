<template>
  <div id="app">
    <Header :banner="bannerLists" :part0="part0" :main_nav="main_nav_list"></Header>
    <router-view
      :index_yyxw="index_yyxwOrder"
      :index_hyxw="index_hyxw"
      :yyjj="yyjj"
      :departmenttype="departmenttype"
      :departmentdata="departmentdata"
      v-on:navid="departmentData"
      :expertdata="expertdata"
      :config="config"
      :index_jkyd="index_jkyd"
      :index_ylsb="index_ylsb"
      :jzzn="jzzn"
      :yyhj="yyhj"
      :sub_nav="sub_nav_list"
    ></router-view>
    <Footer :config="config" :friend_link="friend_link"></Footer>
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
          {'apiUrl':'/index/banner'},//banner
          {'apiUrl':'/index/indexnews'},//首页医院新闻，健康园地
          {'apiUrl':'/gaikuang/jianjie?cid=2'},//医院简介
          {'apiUrl':'/category/soncate?pid=19',"apiUrl1":"/department/departlist"},//科室介绍
          {'apiUrl':'/category/soncate?pid=19',"apiUrl1":"/expertteam/expertindex"},//医院专家
          {'apiUrl':'/contact/system'},//系统配置
          {'apiUrl':'/gaikuang/sblist?type=1'},//医疗设备
          {'apiUrl':'/zhiyin/zhiyin?cid=89'},//就诊指南
          {'apiUrl':'/zhiyin/hjimg'},//医院环境
          {'apiUrl':'/friendly-link/all-name'},//友情链接
          {'apiUrl':'/category/pcate'},//一级导航
          {'apiUrl':'/category/soncate'},//二级导航
        ],
        bannerLists: [],
        part0:[
          {title:"预约挂号",img:require("./assets/part0img1.png"),link:"#"},
          {title:"门诊指南",img:require("./assets/part0img2.png"),link:"#"},
          {title:"住院指南",img:require("./assets/part0img3.png"),link:"#"},
          {title:"科室查询",img:require("./assets/part0img4.png"),link:"#"},
          {title:"专家查询",img:require("./assets/part0img5.png"),link:"#"},
          {title:"账单查询",img:require("./assets/part0img6.png"),link:"#"},
          {title:"楼层指引",img:require("./assets/part0img7.png"),link:"#"},
          {title:"医院公告",img:require("./assets/part0img8.png"),link:"#"}
        ],
        /*首页医院新闻*/
        index_yyxw:[],
        index_hyxw:[],
        /*首页健康园地*/
        index_jkyd:[],
        /*单篇页*/
        yyjj:{},
        /*科室*/
        departmenttype:[],
        departmentdata:[],
        /*专家*/
        expertdata:[],
        /*系统配置*/
        config:{},
        /*首页医疗设备*/
        index_ylsb:[],
        /*就诊指南*/
        jzzn:[],
        /*医院环境*/
        yyhj:[],
        /*友情链接*/
        friend_link:[],
        /*一级导航*/
        main_nav_list:[],
        /*二级导航*/
        sub_nav_list:[],
      }
    },
    created(){
      this.header=this.mainConfig.httpConfig().headers;
      this.imgUrl=this.mainConfig.imgUrl;
      /*this.apiUrl=this.mainConfig.apiUrl;*/
      this.apiUrl='/api';
      this.index_banner(0);
      this.index_news(1,'yyxw',12);
      this.index_news(1,'hyxw',13);
      this.index_news(1,'jkyd',108);
      this.single(2);
      this.departmentType(3);
      this.expert(4);
      this.system(5);
      this.equipment(6);
      this.guide(7);
      this.environment(8);
      this.friendLink(9);
      this.mainNav(10);
      this.subNav(11,this.$route.params.main_nav_id);
    },
    methods:{
      /*banner*/
      index_banner(index) {
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res) => {
            res=res.data.data[0].after;
            let banneritem={};
            for(var i=0;i<res.length;i++){
              res[i].img=$this.imgUrl+res[i].img;
              banneritem={
                backgroundImage: "url(" +res[i].img+ ")",
                zIndex:res[i].sort
              };
                $this.bannerLists.push(banneritem);
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      /*首页part1新闻*/
      index_news(index,type,cid) {
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
          params:{
            cid:cid
          }
        })
          .then((res) => {
            res=res.data.data;
            for(var i=0;i<res.length;i++){
              res[i].thumb=$this.imgUrl+res[i].thumb;
              res[i].created_at=this.dateTime.ymd(res[i].created_at);
              res[i].updated_at=this.dateTime.ymd(res[i].updated_at);
            }
            if(type=='yyxw'){
              $this.index_yyxw=res;
            }
            if(type=='hyxw'){
              $this.index_hyxw=res;
            }
            if(type=='jkyd'){
              $this.index_jkyd=res;
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      /*单篇页*/
      single(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res) => {
            res=res.data.data;
            for(var i=0;i<res.length;i++){
              res[i].thumb=$this.imgUrl+res[i].thumb;
              res[i].created_at=this.dateTime.ymd(res[i].created_at);
              res[i].updated_at=this.dateTime.ymd(res[i].updated_at);
            }
            $this.yyjj=res[0];
          })
          .catch((error) => {
            console.log(error)
          })
      },
      /*科室*/
      departmentType(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res) => {
            $this.departmenttype=res.data.data;
            this.departmentData(index,$this.departmenttype[0].id);
          })
          .catch((error) => {
            console.log(error)
          })
      },
      departmentData(index,navid){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl1,{
          headers:$this.header,
          params:{
            cid:navid
          }
        })
          .then((res) => {
            res=res.data.data;
            for(let j=0;j<res.length;j++){
              res[j].tubiao=$this.imgUrl+res[j].tubiao;
            }
            $this.departmentdata=res;
          })
          .catch((error) => {
            console.log(error)
          })
      },
      /*专家*/
      expert(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res) => {
            let navid=[];
            for(let i=0;i<res.data.data.length;i++){
              navid[i]=res.data.data[i].id
            }
            $this.expertData(index,navid);
          })

          .catch((error) => {
            console.log(error)
          })
      },
      expertData(index,navid){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl1,{
          headers:$this.header,
        })
          .then((res) => {
            let list=[];
            for(let i=0;i<res.data.data.length;i++){
              for(let j=0;j<navid.length;j++){
                if(res.data.data[i].id==navid[j]){
                  list.push(res.data.data[i].keshi);
                }
              }
            }
            for(let i=0;i<list.length;i++){
              for(let j=0;j<list[i].length;j++){
                if(list[i][j].zhuanjia.length>0){
                  for(let k=0;k<list[i][j].zhuanjia.length;k++){
                    list[i][j].zhuanjia[k].images=this.imgUrl+list[i][j].zhuanjia[k].images;
                  }
                  $this.expertdata.push(list[i][j]);
                }
              }
            }
          })

          .catch((error) => {
            console.log(error)
          })
      },
      /*系统配置*/
      system(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header
        })
          .then((res)=>{
            $this.config=res.data.value;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*医疗设备*/
      equipment(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res)=>{
            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].img1=$this.imgUrl+res.data.data[i].img1;
            }
            $this.index_ylsb=res.data.data;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*就诊指引*/
      guide(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res)=>{
            $this.jzzn=res.data.data;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*医院环境*/
      environment(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res)=>{
            for(let i=0;i<res.data.data.length;i++){
              for(let j=0;j<res.data.data[i].after.length;j++){
                res.data.data[i].after[j].img=$this.imgUrl+res.data.data[i].after[j].img;
              }
            }
            $this.yyhj=res.data.data;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*友情链接*/
      friendLink(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res)=>{
            $this.friend_link=res.data.data;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*一级导航*/
      mainNav(index){
        let $this=this;
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
        })
          .then((res)=>{
            $this.main_nav_list=res.data.data;
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*二级导航*/
      subNav(index,main_nav_id){
        let $this=this;
        let expert='';
        if(main_nav_id==49){
          main_nav_id=19;
          expert='专家';
        }
        $this.$axios.get($this.apiUrl+$this.api[index].apiUrl,{
          headers:$this.header,
          params:{
            pid:main_nav_id
          }
        })
          .then((res)=>{
            $this.sub_nav_list=[];
            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].name=res.data.data[i].name+expert;
              if(res.data.data[i].name!=='院容院貌'){
                $this.sub_nav_list.push(res.data.data[i]);
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      /*数据提交*/
      /*submit(){
        let postData = new FormData();
        postData.append('name', this.name);
        postData.append('phone', this.phone);
        postData.append('content', this.message);
        let reg= /^1[34578]\d{9}$/;
        if(this.name===''||this.name===' '||this.name==null) {
          alert('姓名不能为空！');
          this.submitForm();
        }
        else if(!(this.phone.match(reg))){
          alert('电话格式不正确！');
          this.submitForm();
        }
        else if(this.message===''||this.message===' '||this.message==null) {
          alert('留言内容不能为空！');
          this.submitForm();
        }
        else if(this.yzm!==true) {
          alert('验证不通过！');
          this.submitForm();
        }
        else {
          let apiurl = '/zhiyin/message';
          let header=this.mainConfig.httpConfig().headers;
          this.$http.post(this.apiUrl+apiurl, postData,{
            headers:header,
          })
            .then(function (res) {
              if (res.data.data === 1) {
                alert('提交成功！');
                this.name='';
                this.phone='';
                this.message='';
                this.submitForm();
                window.onload.href=this.$route.path;
              }else {
                alert('提交失败！');
              }
            })
        }
      },*/
    },
    /*排序*/
    computed: {
      index_yyxwOrder() {
        return this.index_yyxw.sort((a,b)=>b.id-a.id);
      },
    },
    watch:{
      $route(to,from){
        this.subNav(11,this.$route.params.main_nav_id);
      }
    },
}
</script>

<style lang="scss">
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
    margin: 0 auto;
    min-width: 1200px;
    font-family: "Microsoft YaHei";
    font-size: 14px;
  }
  img{
    vertical-align: middle;
  }
  a{
    color: #333333;
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
  .imgHover img:hover{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05); }
  .imgHover img{
    @include tstAll();
  }
  body,html{
    min-width: 1200px;
    background: #ffffff;
    color: #666666;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
  }
  .header{
    .top{
      height: 29px;
      line-height: 29px;
      border-bottom: 1px solid #eee;
    }
    .top_l{
      float: left;
      color: #999;
    }
    .top_r{
      float: right;
      li{
        float: left;
        &:last-child:after{
          content: "";
          padding: 0;
        }
        &:after {
          content: "|";
          padding: 0 16px;
          color: #999;
          display: inline-block;
        }
      }
      a{
        color: #999;
        display: inline-block;
      }
      .top_ewm{
        position: relative;
        div{
          position: absolute;
          right: 0;
          z-index: 30;
        }
      }
    }
    .center{
      @extend .content;
    }
    .center_l{
      @extend .fl;
      width: 480px;
      padding: 18px 0;
    }
    .center_c{
      @extend .fl;
      width: 332px;
      padding-left: 58px;
      margin: 34px 0 0;
      height: 56px;
      background: url("assets/img2.png") no-repeat left center;

    }
    .center_c,.center_r{
      span{
        font-size: 24px;
        color: #58aaf0;
        font-family: "Arial";
      }
    }
    .center_r{
      @extend .fl;
      margin: 36px 0 0;
      line-height: 26px;
      padding-left: 58px;
      background: url("assets/img1.png") no-repeat left center;
    }
  }
  .main_nav {
    background: #037bd6;
    li{
      float: left;
      color: #fff;
      height: 48px;
      font-size: 16px;
      padding: 0 34px;
      line-height: 48px;
      text-align: center;
      background: url("assets/navline.png") no-repeat left center;
      &:first-child{
        background: none;
      }
    }
    .on,li:hover,.on:first-child,li:first-child:hover{
      background: #fff none;
      color: #037bd6;
    }
  }
  .part0{
    width: 100%;
    height: 90px;
    position: relative;
    margin-top: -90px;
    z-index: 22;
    background: #7abef2;
    li{
      float: left;
      width: 150px;
      height: 90px;
      font-size: 16px;
      text-align: center;
      @include tstAll();
      &:hover{
        background: #189cff;
        img{
          margin-top: -6px;
        }
      }
    }
    a{
      color: #ffffff;
      height: 100%;
    }
    p{
      height: 50px;
      line-height: 50px;
      margin-bottom: 6px;
      img{
        @include tstAll();
      }
    }
  }
  .part1{
    margin-top: 34px;
  }
  .part1_l,.part1_r{
    height: 296px;
    padding: 23px 22px 29px;
    border: 1px solid #eee;
  }
  .part1_l{
    float: left;
    width: 836px;
    .part1_ll{
      float: left;
      width: 350px;
      height: 296px;
    }
    .part1_lr{
      float: right;
      width: 466px;
      li{
        p,a{
          @extend .oneLine;
        }
        .one{
          height: 66px;
          margin-top: 24px;
          .part1_lrl{
            float: left;
            width: 66px;
            height: 66px;
            color: #ffffff;
            text-align: center;
            background: #037bd6;
            p{
              padding: 9px 0 0;
            }
            div{
              padding: 6px 0 0;
              font-size: 18px;
              font-family: "Arial";
            }
          }
          .part1_lrr{
            float: right;
            width: 385px;
            a{
              font-size: 16px;
              height: 30px;
              line-height: 30px;
              margin-bottom: 9px;
              @include tstAll();
              &:hover{
                color: #037bd6;
              }
            }
          }
        }
        &>a{
          background: url("./assets/img3.png") no-repeat left center;
          padding-left: 14px;
          height: 42px;
          line-height: 42px;
          border-bottom: 1px dotted #d4d4d4;
          p{
            float: left;
            width: 360px;
            height: 42px;
            color: #666666;
            @include tstAll();
            &:hover{
              color: #037bd6;
              width: 350px;
              padding-left: 10px;
            }
          }
          span{
            float: right;
            color: #ccc;
            font-family: "Arial";
          }
        }
      }
    }
  }
  .title{
    dt{
      height: 24px;
      float: left;
      font-size: 18px;
      color: #333;
      line-height: 14px;
      margin-right: 40px;
      cursor: pointer;
      border-bottom: 2px solid #fff;
    }
    .on{
      color: #037bd6;
      border-bottom: 2px solid #037bd6;
    }
    dd{
      float: right;
      line-height: 18px;
      a{
        color: #666;
        @include tstAll();
        &:hover{
          color: #037bd6;
        }
      }
      span{
        font-family: "宋体";
        font-weight: bold;
      }
    }
  }
  .part1_r{
    float: right;
    width: 250px;
    .con{
      margin-top: 24px;
      img{
        width: 248px;
        height: 120px;
      }
      div{
        line-height: 24px;
        padding-top: 14px;
        a{
          display: inline-block;
          color: #037bd6;
        }
      }
    }
    ul{
      li{
        float: left;
        margin-left: 12px;
        margin-top: 16px;
        a{
          width: 73px;
          height: 22px;
          overflow: hidden;
          line-height: 22px;
          color: #666;
          text-align: center;
          border-radius: 22px;
          border: 1px solid #ebebeb;
          @include tstAll();
          &:hover{
            color: #ffffff;
            background: #037bd6;
            border: 1px solid #037bd6;
          }
        }
        &:first-child{
          margin-left: 0;
        }
      }
    }
  }
  .part2{
    margin-top: 26px;
    padding-left: 168px;
    padding-top: 5px;
    background: url("./assets/img4.png") no-repeat left bottom;
    li{
      float: left;
      margin-left: 18px;
    }
  }
  .part3,.part4{
    .con{
      margin-top: 42px;
      padding-top: 37px;
      position: relative;
      border-top: 1px solid #ddd;
    }
    .prev_next{
      position: absolute;
      top: -19px;
      width: 100%;
      height: 0;
      z-index: 30;
      a{
        width: 38px;
        height: 38px;
        float: left;
        background: #037bd6;
        text-align: center;
        line-height: 38px;
        color: #ffffff;
        font-family: "宋体";
        font-weight: bold;
        font-size: 28px;
        &:last-child{
          float: right;
        }
      }
    }
    .con_t{
      top: -56px;
      position: relative;
      text-align: center;
      overflow: hidden;
      padding: 0 40px;
      ol{
        display: inline-block;
        height: 38px;
        font-size: 16px;
      }
      li{
        float: left;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        padding: 0 28px;
        background: #fff;
        border: 1px solid #ddd;
        border-left: none;
        &:first-child{
          border-left: 1px solid #ddd;
          &.on{
            border-color: #037bd6;
          }
        }
      }
      .on,li:hover{
        background: #037bd6;
        color: #fff;
        border-color: #037bd6;
      }
    }
  }
  .part3{
    margin-top: 30px;
    padding: 23px 22px 19px;
    border: 1px solid #ddd;
    .con_d{
      margin-top: -42px;
      height: 270px;
      overflow: hidden;
      li{
        float: left;
        width: 270px;
        height: 54px;
        overflow: hidden;
        margin: 18px 0;
        margin-right: 18px;
        &:hover{
          .img{
            border-radius: 50%;
          }
          .tit,.tit span{
            color: #037bd6;
          }
        }
      }
      .img{
        width: 54px;
        height: 54px;
        float: left;
        line-height: 54px;
        text-align: center;
        overflow: hidden;
        background: #037bd6;
        @include tstAll();
        img{
          width: 28px;
        }
      }
      .img1{
        background: #f2ca2a;
      }
      .img2{
        background: #18bae3;
      }
      .tit{
        float: left;
        max-width: 160px;
        line-height: 28px;
        padding-left: 14px;
        @include tstAll();
        p{
          font-size: 16px;
          @extend .oneLine;
        }
        span{
          color: #999;
          @include tstAll();
        }
      }
    }
  }
  .part4{
    margin-top: 17px;
    padding: 23px 22px 19px;
    border: 1px solid #ddd;
    .con_d{
      height: 425px;
      overflow: hidden;
    }
    .con_t{
      height: 38px;
      ol{
        overflow: hidden;
        height: auto;
        border-left: 1px solid #ddd;
      }
    }
  }
  .part4_l{
    float: left;
    width: 610px;
    height: 425px;
    .part4_ll{
      width: 220px;
      height: 300px;
      float: left;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .part4_lr{
      float: right;
      width: 376px;
      a{
        margin-top: 25px;
        color: #666666;
        @extend .oneLine;
        &:hover span{
          color: #037bd6;
        }
        span{
          font-size: 20px;
          padding-right: 10px;
          color: #333333;
          @include tstAll();
        }
      }
      div{
        line-height: 25px;
        height: 150px;
        margin-top: 15px;
        overflow: hidden;
        *{
          line-height: 25px !important;
        }
      }
      ul{
        margin-top: 31px;
      }
      li{
        width: 100px;
        float: left;
        cursor: pointer;
        padding-left: 36px;
        margin-right: 50px;
        color: #999999;
        background: url("./assets/img9.png") no-repeat left center;
        @include tstAll();
        &:hover{
          color: #037bd6;
          background: url("./assets/img10.png") no-repeat left center;
        }
        &:last-child{
          background: url("./assets/img11.png") no-repeat left center;
          &:hover{
            background: url("./assets/img10.png") no-repeat left center;
          }

        }
      }
    }
  }
  .part4_r{
    float: right;
    width: 522px;
    height: 425px;
    overflow: hidden;
    ul{
      width: 543px;
    }
    li{
      float: left;
      width: 160px;
      margin-right: 21px;
      margin-bottom: 11px;
    }
    P{
      width: 160px;
      height: 180px;
      overflow: hidden;
      background: #ccc;
      @extend .imgHover;
      img{
        width: 100%;
        height: 100%;
      }
    }
    div{
      margin-top: 6px;
      color: #666666;
      text-align: center;
      @extend .oneLine;
      &:hover span{
        color: #037bd6;
      }
      span{
        font-size: 16px;
        padding-right: 10px;
        color: #333333;
        @include tstAll();
      }
    }
  }
  .part5,.part6,.part7{
    margin-top: 17px;
  }
  .part5_l,.part5_r,.part6_l,.part6_r{
    float: left;
    padding: 23px 22px 29px;
    border: 1px solid #eee;
    width: 824px;
  }
  .part5_l,.part5_r{
    height: 310px;
    ul{
      margin-top: 24px;
      margin-left: -32px;
    }
    li{
      float: left;
      width: 396px;
      height: 42px;
      line-height: 42px;
      margin-left: 32px;
      border-bottom: 1px dotted #d4d4d4;
    }
    .first{
      height: auto;
      margin-bottom: 10px;
      border: none;
      max-height: 80px;
    }
    .img{
      width: 130px;
      height: 80px;
      overflow: hidden;
      background: #ccc;
      float: left;
      @extend .imgHover;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .con{
      width: 248px;
      line-height: 25px;
      float: right;
      a{
        line-height: 24px;
        height: 24px;
        font-size: 16px;
        margin-bottom: 9px;
        @extend .oneLine;
        @include tstAll();
        &:hover{
          color: #037bd6;
        }
      }
    }
    .tit{
      width: 260px;
      position: relative;
      float: left;
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 14px;
      background: url("./assets/img3.png") no-repeat left center;
      @include tstAll();
      &:hover{
        color: #037bd6;
        padding-left: 20px;
      }
    }
    .date{
      float: right;
      color: #ccc;
      font-family: Arial;
    }
  }
  .part5_r{
    width: 266px;
    float: right;
    .con{
      dl{
        &:last-child dt{
          background: url("./assets/position.png") no-repeat left center;
        }
        dt{
          font-size: 16px;
          color: #333;
          padding-left: 40px;
          margin: 22px 0 17px;
          background: url("./assets/phone.png") no-repeat left center;
        }
        dd{
          padding-left: 40px;
          height: 36px;
          line-height: 36px;
          max-height: 72px;
          overflow: hidden;
        }
        span{
          font-family: "Arial";
        }
      }
    }
  }
  .part6_l,.part6_r {
    height: 350px;
  }
  .part6_l{
    .title{
      margin-bottom: 30px;
    }
    ul{
      border: 1px solid #dddddd;
      li{
        height: 58px;
        line-height: 58px;
        border-top: 1px solid #dddddd;
        position: relative;
        padding: 0 20px;
        cursor: pointer;
        @include tstAll();
        &:first-child{
          margin-top: -1px;
        }
      }
      .on,li:hover{
        background: #037bd6;
        color: #fff;
        &:before{
          position: absolute;
          content: "";
          right: -10px;
          top: 24px;
          width: 0;
          height: 0;
          z-index: 10;
          border-top: 6px solid transparent;
          border-left: 10px solid #037bd6;
          border-bottom: 6px solid transparent;
        }
      }
    }
    .part6_lr{
      width: 576px;
      .img{
        width: 312px;
        height: 296px;
        float: left;
        overflow: hidden;
        background: #ccc;
        @extend .imgHover;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tit{
        @include tstAll();
        &:hover{
          color: #037bd6;
        }
      }
    }
  }
  .part6_ll{
    float: left;
    width: 230px;
    height: 296px;
    overflow: hidden;
    padding-right: 10px;
  }
  .part6_lr{
    float: right;
    .con{
      width: 248px;
      height: 298px;
      float: right;
      overflow: hidden;
      line-height: 25px;
    }
  }
  .part6_r{
    width: 266px;
    float: right;
    ul{
      margin-top: 14px;
    }
    li{
      height: 42px;
      line-height: 42px;
      padding-left: 14px;
      border-bottom: 1px dotted #ccc;
      background: url("./assets/img3.png") no-repeat left center;
      a{
        @extend .oneLine;
        @include tstAll();
        &:hover{
          color: #037bd6;
          padding-left: 6px;
        }
      }
    }
  }
  .part7{
    padding: 26px 22px;
    border: 1px solid #dddddd;
  }
  .friend_link.on{
    height: auto;
  }
  .friend_link{
    height: 36px;
    line-height: 36px;
    background: #fafafa;
    margin-top: 47px;
    overflow: hidden;
    .tip{
      width: 78px;
      float: left;
      padding-left: 25px;
      background: url("./assets/friendLink.png") no-repeat left center;
    }
    .link{
      float: left;
      width: 1020px;
      overflow: hidden;
      ul{
        margin-left: -26px;
      }
      li{
        float: left;
        &:before {
          content: "|";
          padding: 0 16px;
          color: #ccc;
          display: inline-block;
        }
      }
      a{
        color: #666666;
        display: inline-block;
        @include tstAll();
        &:hover{
          color: #037bd6;
        }
      }
    }
    .more{
      float: right;
      color: #666666;
    }
  }
  .footer{
    background: #037bd6;
    height: 212px;
    overflow: hidden;
  }
  .footer_l{
    margin-top: 38px;
    float: left;
    color: #fff;
    line-height: 32px;
    span{
      font-family: "Arial";
    }
  }
  .footer_r{
    margin-top: 24px;
    float: right;
    text-align: left;
    line-height: 36px;
    dl{
      float: left;
      padding-left: 52px;
    }
    dt{
      width: 82px;
      font-size: 16px;
      padding: 3px 0;
      margin-bottom: 13px;
      border-bottom: 1px solid #90c0e4;
    }
    dt,a{
      color: #fff;
    }
  }
  .copyright{
    height: 48px;
    background: #036cbb;
    text-align: center;
    color: #f5f5f5;
    line-height: 48px;
    a{
      display: inline-block;
      color: #f5f5f5;
    }
  }
  .other_page{
    .sub_nav{
      height: 60px;
      text-align: center;
      background: url("./assets/img13.png") repeat-x bottom;
      ul{
        display: inline-block;
      }
      li{
        float: left;
      }
      a{
        padding: 0 31px;
        height: 53px;
        font-size: 16px;
        line-height: 53px;
        text-align: center;
        color: #666666;
        border-bottom: 1px solid #fff;
      }
      .on{
        border-color: #58aaf0;
      }
    }
  }
</style>
