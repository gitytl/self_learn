<template>
  <div class="content">
      <div class="pc">
        <div class="more" @click="moreClick('.i_common1')"></div>
        <div class="i_common i_common1" v-show="conIndex==1"  :class="{show:showFlag}" :style="'height: '+(fullHeight-80)+'px;margin-top:-'+fullHeight/2+'px'">
          <div class="part1">
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
        <div class="i_common i_common1" v-show="conIndex==2" :class="{show:showFlag}" :style="'height: '+(fullHeight-80)+'px;margin-top:-'+fullHeight/2+'px'">
          <div class="part2">
            <div class="bg"><img src="../assets/img2.png" alt="背景"></div>
            <div class="title">爱好</div>
            <div class="tit" v-for="(item,index) in hobby_lists.slice(0,6)"
                 :style="'background-image: url('+item.images+')'" :class="'tit'+(index+1)">{{item.title}}</div>
          </div>
          <div class="part3">
            <div class="tit">想了解我吗？</div>
            <div class="con">
              <p>当然每个人都是独一无二的，不管是性格，爱好，欣赏水平等等都会存在着差异，有相似，但不可能有相同，因此不要去仿别人，做真实的自己。</p>
              <p>我！胆小的我对新鲜事物充满好奇，坚强忍耐。不会记仇，简单，摩羯的我对陌生人会排斥，不自然，但认定了的朋友就是一辈子。</p>
              <p>个人爱好很多，有动有静，就像我的性格一样，静如处子，动如脱兔。 静的时候就听听歌、看看电视剧、玩玩手游、绣绣十刺绣、养养多肉； 动的时候四处走走，亲近一下大自然，呼吸大自然的清新空气。</p>
            </div>
          </div>
        </div>
      </div>
    <div class="web_app">
      <div class="more" @click="moreClick('.i_common2')"></div>
      <div class="i_common i_common2" v-show="conIndex==1"  :class="{show:showFlag}" :style="'margin-top:-'+fullHeight/0.8/2+'px'">
        <div class="part1">
          <div class="title">家乡</div>
          <div class="lists">
            <div class="desc">宝剑双蛟龙<br>雪花照芙蓉<br>精光射天地<br>雷腾不可冲</div>
          </div>
        </div>
      </div>
      <div class="i_common i_common2" v-show="conIndex==2"  :class="{show:showFlag}" :style="'margin-top:-'+fullHeight/0.8/2+'px'">
        <div class="part1">
          <div class="lists">
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
      <div class="i_common i_common2" v-show="conIndex==3" :class="{show:showFlag}" :style="'margin-top:-'+fullHeight/0.8/2+'px'">
        <div class="part3">
          <div class="tit">自我描述</div>
          <div class="con">
            <p>不做赝品，只做真实的自己；</p>
            <p>对新鲜事物充满好奇，珍惜我已经拥有的；</p>
            <p>爱好广泛，但偏爱大自然的清新空气和生机；</p>
            <p>静如处子，动如脱兔。</p>
          </div>
        </div>
      </div>
      <div class="i_common i_common2" v-show="conIndex==4" :class="{show:showFlag}" :style="'margin-top:-'+fullHeight/0.8/2+'px'">
        <div class="part2">
          <div class="tit" v-for="(item,index) in hobby_lists.slice(0,6)"
               :style="'background-image: url('+item.images+');'">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Animation from './public/Animation'
  export default{
    name: 'Index',
    props:["home_view","hobby_lists","fullHeight"],
    components:{Animation},
    data(){
      return{
        flog:true,
        showFlag:false,
        conIndex:0,
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      moreClick(tag){
        this.conIndex++;
        this.showFlag=false;
        if(this.conIndex>document.querySelectorAll(tag).length){
          this.conIndex=0;
        }
        setTimeout(()=>{
          this.showFlag=true;
        },300);
      }
    }
  }
</script>
