<template>
<div class="common single" :style="'height: '+fullHeight+'px;margin-top:-'+fullHeight/2+'px'">
  <div class="page_intro" :class="{on:page_intro_on}" ref="page_intro" v-for="i in 4" :style="'height: '+(fullHeight-20)+'px;top:'+2*i+'px;left:'+i+'px;z-index:'+(4-i)">
    <div class="click_tag" @click="prev_next(i)" v-show="i==1"></div>
    <div class="con" v-show="i==1">
      <div class="tit">个人简历</div>
      <p>姓名：XXX</p>
      <span>应聘岗位：XXXXXX</span>
      <p>项目经验：n年</p>
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
              page_intro_on:false,
            }
        },
        created() {

        },
        methods: {
          prev_next(index){
            this.page_intro_on=true;
            if(index==2){
              this.page_intro_on=false;
            }
          }
        }
    }
</script>

<style scoped>

</style>
