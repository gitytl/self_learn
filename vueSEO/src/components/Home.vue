<template lang="pug">
  div(class="products")
    div(v-for="product in products", class="product")
      product(:product="product")
    div(class="cs")
</template>

<script>
  import Product from './../components/Product.vue'

  export default {
    name: 'home',
    components: { Product },
    computed: {
      products(){
        return this.$store.state.products
      }
    }
  }
</script>
<style>
  .cs{
    width: 100%;
    height: 50px;
    background: aqua;
  }
</style>
