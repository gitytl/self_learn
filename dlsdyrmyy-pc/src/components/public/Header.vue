<template>
<div class="header">
  <div class="top">
    <div class="content clearFix">
      <div class="top_l">欢迎访问大理市第一人民医院官方网站！</div>
      <ul class="top_r clearFix">
        <li><a @click="shouCang()">加入收藏</a></li>
        <li><a @click="setHome()">设为首页</a></li>
        <li><a href="http://p.qiao.baidu.com/cps/chat?siteId=12824602&amp;userId=26851461">在线客服</a></li>
        <li class="top_ewm"><a href="javascript:;" @click="flag">二维码</a><div v-show="flog"><img src="../../assets/ewm.png" alt="二维码"></div></li>
      </ul>
    </div>
  </div>
  <div class="center clearFix">
    <router-link :to="{ name: 'index'}" class="center_l">
      <img src="../../assets/logo.png" alt="logo">
    </router-link>
    <div class="center_c">
      <div>总值班电话：<span>0872-2124462</span></div>
      <div>护理总值班电话：<span>0872-2181092</span></div>
    </div>
    <div class="center_r">
      <div>大理市第一人民医院节假日无休</div>
      <span>8:30-17:30</span>
    </div>
  </div>
  <div class="main_nav">
    <ul class="content clearFix">
      <router-link tag="li" to="/" exact>网站首页</router-link>
      <router-link tag="li" :to="{name:'main_nav',params:{main_nav_id:item.id,main_nav_name:item.alias}}" v-for="item in main_nav">{{item.name}}</router-link>
    </ul>
  </div>
  <Animation :list="banner" :banner="true"></Animation>
  <div class="part0" v-show="this.$route.path.search('index')!==-1">
      <ul class="content clearFix">
        <li v-for="item in part0">
          <router-link :to="{name:'index'}">
            <p><img :src="item.img" alt=""></p>
            <span>{{item.title}}</span>
          </router-link>
        </li>
      </ul>
  </div>
</div>
</template>

<script>
  import Animation from './Animation'
    export default {
      name: "p_header",
      props:["banner","part0","main_nav"],
      components:{Animation},
      data(){
        return{
          flog:false,
        }
      },
      created() {

      },
      methods:{
        flag:function () {
          this.flog=!this.flog;
        },
        // 设置为主页
        setHome(){
          try{
            this.style.behavior='url(#default#homepage)';this.setHomePage(window.location.href);
          }
          catch(e){
            if(window.netscape) {
              try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
              }
              catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
              }
              var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
              prefs.setCharPref('browser.startup.homepage',window.location.href);
            }else{
              alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+window.location.href+"点击确定。");
            }
          }
        },
        // 加入收藏 兼容360和IE6
        shouCang() {
          try
          {
            window.external.addFavorite(window.location.href, document.title);
          }
          catch (e)
          {
            try
            {
              window.sidebar.addPanel(document.title, window.location.href, "");
            }
            catch (e)
            {
              alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
          }
        },
      },
    }
</script>
