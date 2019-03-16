<template>
<div class="header">
  <ul class="main_nav" :class="{on:!nav_center}" >
    <li><router-link to="/" exact>首页</router-link></li>
    <li v-for="item in main_nav">
      <router-link
        :to="{
        name:'sub_nav',
        params:{
        main_nav_name:item.english,
        main_nav_id:item.id,
        sub_nav_id:item.id,
        sub_nav_name:item.english,
        module:item.remark}}"
      >{{item.title}}</router-link></li>
  </ul>
  <Animation :list="banner" :banner="true"></Animation>
</div>
</template>

<script>
  import Animation from './Animation'
    export default {
      name: "p_header",
      props:["banner","nav_center","main_nav"],
      components:{Animation},
      data(){
        return{

        }
      },
      created() {

      },
      methods:{

      },
    }
</script>
