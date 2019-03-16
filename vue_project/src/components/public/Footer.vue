<template>
<div class="footer">
  {{config.content}}
</div>
</template>

<script>
    export default {
      name: "p_footer",
        props:["config"],
      data(){
        return{

        }
      },
      created(){
        this.header=this.mainConfig.httpConfig().headers;
        this.imgUrl=this.mainConfig.imgUrl;
        /*this.apiUrl=this.mainConfig.apiUrl;*/
        this.apiUrl='/api';
      },
      methods:{

      }
    }
</script>
