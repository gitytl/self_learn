<template>
<div class="single" :style="'height: '+fullHeight+'px'">
  <div class="left"></div>
  <div class="right"></div>
</div>
</template>

<script>
    export default {
        name: "single",
        props: [],
        data() {
            return {
              fullHeight: document.documentElement.clientHeight-120,
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
