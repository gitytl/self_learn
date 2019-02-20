<template>
    <div class="other_page content">
      <div class="sub_nav">
        <ul>
          <li v-for="item in sub_nav"><router-link :to="{name:'sub_nav',params:{sub_nav_id:item.id,sub_nav_name:item.alias,module:item.remark}}">{{item.name}}</router-link></li>
        </ul>
      </div>
      <router-view :name="this.$route.params.module" ></router-view>
    </div>
</template>

<script>
    export default {
      name: "Other",
      props:["sub_nav"],
      data(){
        return{

        }
      },
      created(){

      },
      mounted(){

      },
      methods:{

      },
    }
</script>
