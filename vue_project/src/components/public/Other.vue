<template>
    <div class="other_page content">
      <router-view
        :name="this.$route.params.module"
        :hobby_lists="hobby_lists"
      ></router-view>
    </div>
</template>

<script>
    export default {
      name: "Other",
      props:["main_nav","hobby_lists"],
      data(){
        return{

        }
      },
      created(){
        for (var i=0;i<this.main_nav.length;i++){
          if(this.main_nav[i].id===this.$route.params.sub_nav_id){
            this.$route.params.module=this.main_nav[i].remark;
          }
        }
      },
      methods:{

      }
    }
</script>
