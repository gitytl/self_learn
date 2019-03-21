<template>
  <div class="common" :style="'height: '+fullHeight+'px;margin-top:-'+fullHeight/2+'px'">
    <div class="bg"><img src="../assets/img2.png" alt="bg"></div>
    <div class="o_lists" :style="'height: '+(fullHeight-80)+'px'">
      <ul>
        <li v-for="item in collect_lists"><img :src="item.images" alt="清新背景"></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Lists",
      props: ["collect_lists","fullHeight"],
      data() {
        return {

        }
      },
      mounted() {

      },
      methods: {

      },
      watch:{
        $route(to,from){

        }
      },
    }
</script>

<style scoped>

</style>
