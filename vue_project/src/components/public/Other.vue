<template>
    <div class="other_page">
      <router-view
        :name="this.$route.params.module"
        :collect_lists="collect_lists"
        :fullHeight="fullHeight"
      ></router-view>
    </div>
</template>

<script>
    export default {
      name: "Other",
      props:["main_nav","collect_lists","fullHeight"],
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
