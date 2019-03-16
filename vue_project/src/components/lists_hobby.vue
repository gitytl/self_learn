<template>
    <div class="oLists">
      <ul>
        <li v-for="item in hobby_lists">{{item.title}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "Lists",
      props: ["hobby_lists"],
      data() {
        return {}
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
