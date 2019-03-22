<template>
<div class="common single" :style="'height: '+fullHeight+'px;margin-top:-'+fullHeight/2+'px'">
  <div class="page_intro" :class="{on:page_intro_on,prev_page:i==prev_index,next_page:i==next_index}" ref="prev_page" v-for="i in 6" :style="'height: '+(fullHeight-20)+'px;top:'+2*i+'px;left:'+i+'px;z-index:'+(6-i)">
    <div class="click_tag" @click="prev_next(i)"></div>
    <div class="con" v-show="i==1">
      <div class="tit">个人简历</div>
      <div class="img"><img src="../assets/tx.jpg" alt="头像"></div>
      <p>姓名：XXX</p>
      <span>应聘岗位：XXXXXX</span>
      <p>联系方式：18687825506</p>
      <p>项目经验：n年</p>
    </div>
    <div class="con" v-show="i==2">
      专业技能
    </div>
    <div class="con" v-show="i==3">
      第二页
    </div>
    <div class="con" v-show="i==4">
      第三页
    </div>
    <div class="con" v-show="i==5">
      第四页
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "single",
        props: ["fullHeight"],
        data() {
            return {
              click_tag:1,
              prev_index:-1,
              next_index:0,
              page_intro_on:false,
            }
        },
        created() {

        },
        methods: {
          prev_next(index){
            var page_intro=document.querySelectorAll(".page_intro");
            if(index>page_intro.length-2||index==2){
              this.page_intro_on=false;
              this.prev_index=-1;
              this.next_index=this.prev_index+1;
              for( var i=0;i<page_intro.length;i++){
                page_intro[i].style.zIndex=page_intro.length-i;
              }
            }
            else {
              if(index-this.prev_index==1){
                this.page_intro_on=true;
                this.prev_index=-1;
                this.next_index=index-2;
                for( var i=0;i<page_intro.length;i++){
                  (i<this.next_index)?page_intro[i].style.zIndex=i+1:page_intro[i].style.zIndex=page_intro.length-i;
                }
              }
              else{
                this.page_intro_on=true;
                this.prev_index=index;
                this.next_index=this.prev_index+1;
                for( var i=0;i<page_intro.length;i++){
                  (i<=index)?page_intro[i].style.zIndex=i+1:page_intro[i].style.zIndex=page_intro.length-i;
                }
              }
            }
          }
        }
    }
</script>

<style scoped>

</style>
