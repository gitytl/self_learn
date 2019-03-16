<template>
  <div>
    <div class="fade banner" v-show="banner">
      <ul>
        <li v-for="(item,index) in list" :class="{'on':index===currentIndex}" :style="'background-image: url('+item.images+')'"></li>
      </ul>
      <ol :style="{zIndex:list.length}">
        <li v-for="(item,index) in list" :class="{'on':index===currentIndex}" @mouseover="stop" @mouseleave="go" @click="change(index)"></li>
      </ol>
    </div>
    <div class="fade animation1" v-show="part1animation">
      <ul>
        <li v-for="(item,index) in list.slice(0,5)" :class="{'on':index===currentIndex}" :style="item">
          <a href="#">
            <img :src="item.thumb" alt="新闻图片">
            <p><span>{{item.title}}</span></p>
          </a>
        </li>
      </ul>
      <ol>
        <li v-for="(item,index) in list.slice(0,5)" :class="{'on':index===currentIndex}" @mouseover="stop" @mouseleave="go" @click="change(index)"></li>
      </ol>
    </div>
    <div class="animation2" v-show="part7animation" @mouseover="stop2" @mouseleave="go2">
      <div class="con" :style="{marginLeft:move2+'px'}">
        <ul v-for="(item,index) in list">
          <li class="animation_item" v-for="(item_data,item_index) in item.after">
            <a>
              <div class="img"><img :src="item_data.img" alt="医院环境"></div>
              <p>{{item_data.desc}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "animation",
      props:['list','banner','part1animation','part7animation'],
      data(){
        return{
          /**/
          currentIndex: 0,
          timer: '',
          time:3000,
          /**/
          currentIndex2: 0,
          timer2: '',
          time2:2000,
          show2:5,
          item_w2:233,
          move2:0,
        }
      },
      created() {
        this.$nextTick(() => {
          this.timer = setInterval(() => {
            this.autoPlay();
          }, this.time);
          this.timer2 = setInterval(() => {
            this.autoPlay2();
          }, this.time2)
        })
      },
      methods:{
        go() {
          this.timer = setInterval(() => {
            this.autoPlay()
          }, this.time)
        },
        stop() {
          clearInterval(this.timer);
          this.timer = null
        },
        change(index) {
          this.currentIndex = index
        },
        autoPlay() {
          this.currentIndex++;
          if (this.currentIndex > this.list.length - 1) {
            this.currentIndex = 0
          }
        },
        /**/
        go2() {
          this.timer2 = setInterval(() => {
            this.autoPlay2()
          }, this.time2)
        },
        stop2() {
          clearInterval(this.timer2);
          this.timer2 = null
        },
        autoPlay2() {
          let len=document.querySelectorAll('.animation_item');
          this.currentIndex2++;
          if (this.currentIndex2 > Math.ceil(len.length/this.show2)-1) {
            this.currentIndex2 = 0
          }
          this.move2=-this.currentIndex2*this.item_w2*this.show2;
        }
      },
    }
</script>

<style lang="scss">
  .fade{
    position: relative;
    ul{
      li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: #eeeeee;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -ms-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
      }
      .on{
        opacity: 1;
      }
    }
    ol{
      position: absolute;
      width: 100%;
      text-align: center;
      li{
        display: inline-block;
        background-color: #fff;
        cursor: pointer;
      }
      .on{
        background: #037bd6;
      }
    }
  }
  .banner{
    height: 500px;
    ol{
      bottom: 40px;
      line-height: 10px;
      li{
        height: 10px;
        width: 10px;
        margin: 0 13px;
        border-radius: 10px;
      }
    }
  }
  .animation1{
    width: 350px;
    height: 296px;
    background: #eeeeee;
    ul{
      width: 100%;
      height: 100%;
    }
    a,p,ol{
      position: absolute;
      bottom: 0;
      right: 0;
    }
    a,img{
      width: 100%;
      height: 100%;
    }
    p{
      width: 210px;
      height: 36px;
      line-height: 36px;
      color: white;
      padding: 0 124px 0 16px;
      span{
        position: absolute;
        z-index: 2;
        width: 210px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:before{
        content: "";
        background: #000;
        opacity: .5;
        width: 100%;
        height: 36px;
        position: absolute;
        right: 0;
        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
        filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
      }
    }
    ol{
      right: 7px;
      height: 20px;
      bottom: 8px;
      text-align: right;
      .on{
        background: #0269b7;
      }
      li{
        width: 6px;
        height: 6px;
        margin: 0 7px;
        border-radius: 50%;
      }
    }
  }
  .animation2{
    width: 1154px;
    height: 185px;
    overflow: hidden;
    margin: 25px auto 0;
    .con{
      display: flex;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      -o-transition: all 0.5s;
      transition: all 0.5s;
    }
    ul{
      float: left;
      display: flex;
    }
    li{
      float: left;
      width: 222px;
      margin-right: 11px;
      text-align: center;
    }
    .img{
      width: 210px;
      padding: 4px 5px;
      height: 130px;
      margin-bottom: 20px;
      overflow: hidden;
      border: 1px solid #dddddd;
      &:hover img{
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
        transform: scale(1.03);
      }
      img{
        width: 100%;
        height: 100%;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
      }
    }
    a{
      color: #666666;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      -o-transition: all 0.5s;
      transition: all 0.5s;
      &:hover{
        color: #037bd6;
      }
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
