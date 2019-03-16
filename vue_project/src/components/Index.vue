<template>
  <div class="content">
    <div class="more"></div>
    <div class="common" ref="homePage">
      <div class="part2" ref="part2">
        <div class="bg"><img src="../assets/img2.png" alt="背景"></div>
        <div class="title">爱好</div>
        <div class="tit" v-for="(item,index) in hobby_lists.slice(0,6)"
             :style="'background-image: url('+item.images+')'" :class="'tit'+(index+1)">{{item.title}}</div>
      </div>
      <div class="part1" ref="part1">
        <div class="title">家乡</div>
        <div class="lists">
          <div class="desc">宝剑双蛟龙<br>雪花照芙蓉<br>精光射天地<br>雷腾不可冲</div>
          <div class="con">
            <a v-for="item in home_view" :style="'background-image: url('+item.images+')'">
              <dl>
                <dt>{{item.name}}</dt>
                <dd>{{item.description}}</dd>
              </dl>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Animation from './public/Animation'
  export default{
    name: 'Index',
    props:["home_view","hobby_lists"],
    components:{Animation},
    data(){
      return{
        flog:true,
        clientHeight:"",
      }
    },
    created(){

    },
    mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`;          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods:{
      changeFixed(clientHeight) {                        //动态修改样式
        var contentH=120+460+40;
        this.$refs.homePage.style.height = contentH + 'px';
        this.$refs.homePage.style.margin = (clientHeight-contentH)/2 + 'px 0';
        this.$refs.homePage.style.top = -clientHeight + 'px';
      },
    }
  }
</script>
