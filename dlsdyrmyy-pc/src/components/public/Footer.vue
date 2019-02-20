<template>
<div>
  <div class="friend_link" :class="{on:minH}">
    <div class="content clearFix">
      <div class="tip">友情链接：</div>
      <div class="link">
        <ul>
          <li v-for="item in friend_link"><a target="_blank" :href="item.url">{{item.name}}</a></li>
        </ul>
      </div>
      <a class="more" v-show="!minH" @click="moreClick()">更多</a>
      <a class="more" v-show="minH" @click="moreClick()">收起</a>
    </div>
  </div>
  <div class="footer">
    <div class="content">
      <div class="footer_l">
        <img src="../../assets/logo1.png" alt="logo">
        <p>总值班室：<span>{{config.zzbsdh}}</span></p>
        <p>医院地址：{{config.address}}</p>
      </div>
      <div class="footer_r">
        <dl v-for="item in footer_url">
          <dt>{{item.name}}</dt>
          <dd v-for="item_data in item.list"><a>{{item_data.name}}</a></dd>
        </dl>
      </div>
    </div>
  </div>
  <div class="copyright">
    Copyright © 2018 大理市第一人民医院 版权所有  滇ICP备11004398号-1&nbsp;&nbsp;|&nbsp;&nbsp;技术支持：<a target="_blank" href="http://www.chuanhai.net">川海科技</a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="" style="display: inline-block;" target="_blank" title="站长统计" id="tjdm"></a>
  </div>
</div>
</template>

<script>
    export default {
      name: "p_footer",
      props:["friend_link"],
      data(){
        return{
          minH:false,
          footer_url:[
            {
              name:"医院概况",
              list:[
                {name:"医院简介",url:""},
                {name:"医院文化",url:""},
                {name:"医疗设备",url:""},
              ]
            },
            {
              name:"新闻公告",
              list:[
                {name:"医院新闻",url:""},
                {name:"行业新闻",url:""},
                {name:"公益活动",url:""},
              ]
            },
            {
              name:"科室介绍",
              list:[
                {name:"临床科室",url:""},
                {name:"医技科室",url:""},
                {name:"重点科室",url:""},
              ]
            },
            {
              name:"医疗服务",
              list:[
                {name:"预约挂号",url:""},
                {name:"科室查询",url:""},
                {name:"医师查询",url:""},
              ]
            },
            {
              name:"就诊指引",
              list:[
                {name:"住院指南",url:""},
                {name:"门诊指南",url:""},
                {name:"医院环境",url:""},
              ]
            },
            {
              name:"党群工作",
              list:[
                {name:"党员之家",url:""},
                {name:"工会工作",url:""},
                {name:"职工活动",url:""},
              ]
            },
          ],
          header:"",
          imgUrl:"",
          apiUrl:"",
          config:[],
        }
      },
      created(){
        this.header=this.mainConfig.httpConfig().headers;
        this.imgUrl=this.mainConfig.imgUrl;
        /*this.apiUrl=this.mainConfig.apiUrl;*/
        this.apiUrl='/api';
        this.system();
      },
      methods:{
        moreClick(){
          this.minH=!this.minH;
        },
        system(){
          let $this=this;
          $this.$axios.get($this.apiUrl+'/contact/system',{
            headers:$this.header
          })
            .then((res)=>{
              /*统计代码*/
              let span = document.createElement('span');
              let script = document.createElement('script');
              let cnzz_protocol=(("https:" == document.location.protocol) ? "https://" : "http://");
              let src=cnzz_protocol+ unescape(res.data.value.website_statics_script.split(';')[1]);
              let idNum=res.data.value.website_statics_script.split(';')[0];
              let href='http://www.cnzz.com/stat/website.php?web_id='+idNum.split('_')[3];

              span.setAttribute('id', idNum);
              script.setAttribute('src', src);
              document.getElementById('tjdm').appendChild(span);
              document.getElementById('tjdm').appendChild(script);
              document.getElementById('tjdm').setAttribute('href',href);
              $this.config=res.data.value;
            })
            .catch((error)=>{
              console.log(error);
            })
        },
      }
    }
</script>
