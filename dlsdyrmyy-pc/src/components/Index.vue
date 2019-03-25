<template>
  <div class="content">
    <div class="PC">
      <div class="part1 clearFix">
        <div class="part1_l clearFix">
          <div class="part1_ll" v-show="part1tab">
            <Animation :list="index_yyxw.slice(0,5)" :part1animation="true"></Animation>
          </div>
          <div class="part1_ll" v-show="!part1tab">
            <Animation :list="index_hyxw.slice(0,5)" :part1animation="true"></Animation>
          </div>
          <div class="part1_lr">
            <dl class="title clearFix">
              <dt :class="{on:part1tab}" @click="news">医院新闻</dt>
              <dt :class="{on:!part1tab}" @click="news">行业新闻</dt>
              <dd v-show="part1tab"><a href="#">更多<span>>></span></a></dd>
              <dd v-show="!part1tab"><a href="#">更多<span>>></span></a></dd>
            </dl>
            <ul v-show="part1tab">
              <li v-for="(item,index) in index_yyxw.slice(0,5)">
                <div v-if="index===0" class="one">
                  <div class="part1_lrl">
                    <p>医院新闻</p>
                    <div>{{item.created_at.slice(5,item.created_at.length)}}</div>
                  </div>
                  <div class="part1_lrr">
                    <a href="#">{{item.title}}</a>
                    <p>{{item.summary|word_lable}}</p>
                  </div>
                </div>
                <router-link :to="{name:'sub_nav',query:{id:item.id},params:{main_nav_name:'news',main_nav_id:11,sub_nav_name:'yynews',sub_nav_id:12,module:'detail'}}" v-if="index!==0">
                  <p>{{item.title}}</p>
                  <span>{{item.created_at}}</span>
                </router-link>
              </li>
            </ul>
            <ul v-show="!part1tab">
              <li v-for="(item,index) in index_hyxw.slice(0,5)">
                <div v-if="index===0" class="one">
                  <div class="part1_lrl">
                    <p>行业新闻</p>
                    <div>{{item.created_at.slice(5,item.created_at.length)}}</div>
                  </div>
                  <div class="part1_lrr">
                    <a href="#">{{item.title}}</a>
                    <p>{{item.summary|word_lable}}</p>
                  </div>
                </div>
                <a v-if="index!==0" href="#">
                  <p>{{item.title}}</p>
                  <span>{{item.created_at}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="part1_r">
          <dl class="title clearFix">
            <dt class="on">医院简介</dt>
            <dd><a href="#">更多<span>>></span></a></dd>
          </dl>
          <div class="con">
            <img :src="yyjj.thumb" alt="医院简介">
            <div>{{yyjj.summary|word_lable|word_len(0,46)}}<a href="#">[详情]</a></div>
          </div>
          <ul>
            <li><a href="#">医院文化</a></li>
            <li><a href="#">组织架构</a></li>
            <li><a href="#">医院荣誉</a></li>
          </ul>
        </div>
      </div>
      <ul class="part2 clearFix">
        <li><a href="#"><img src="../assets/img5.png" alt="图片"></a></li>
        <li><a href="#"><img src="../assets/img6.png" alt="图片"></a></li>
        <li><a href="#"><img src="../assets/img7.png" alt="图片"></a></li>
        <li><a href="#"><img src="../assets/img8.png" alt="图片"></a></li>
      </ul>
      <div class="part3">
        <dl class="title clearFix">
          <dt class="on">科室介绍</dt>
          <dd><a href="#">更多<span>>></span></a></dd>
        </dl>
        <div class="con">
          <div class="con_t">
            <ol>
              <li v-for="(item,index) in departmenttype" @click="part3click(index)" :class="{on:index===part3index}">{{item.name}}</li>
            </ol>
          </div>
          <ul class="con_d" v-for="(item,index) in departmenttype" v-show="index===part3index">
            <li v-for="(item_data,item_index) in departmentdata">
              <a href="#">
                <div class="img" :class="{img1:item_index>3,img2:item_index>7}">
                  <img :src="item_data.tubiao" :alt="item_data.title">
                </div>
                <div class="tit">
                  <p>{{item_data.name}}</p>
                  <span>{{item_data.remark}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="part4">
        <dl class="title clearFix">
          <dt class="on">医院专家</dt>
          <dd><a href="#">更多<span>>></span></a></dd>
        </dl>
        <div class="con">
          <div class="prev_next" v-show="prev_next" @mouseenter="part4Show(true)" @mouseleave="part4Show(false)">
            <a @click="part4prev_next(-1)">&lt;</a>
            <a @click="part4prev_next(1)">&gt;</a>
          </div>
          <div class="con_t" @mouseenter="part4Show(true)" @mouseleave="part4Show(false)">
            <ol id="con_tol" :style="{marginTop:-s*part4olh+'px'}">
              <li v-for="(item,index) in expertdata" :class="{on:index===part4index}" @click="part4click(index)">{{item.keshi_name}}</li>
            </ol>
          </div>
          <div class="con_d" v-show="index===part4index"  v-for="(item,index) in expertdata">
            <div class="part4_l" v-for="(item_data,index_data) in item.zhuanjia.slice(0,6)" v-show="index_data===part4index2">
              <div class="part4_ll imgHover">
                <img :src="item_data.images" alt="专家图片">
              </div>
              <div class="part4_lr">
                <a><span>{{item_data.name}}</span>{{item_data.zhiwu}}</a>
                <div v-html="item_data.summary"></div>
                <ul>
                  <li>查看详情</li>
                  <li>立即咨询</li>
                </ul>
              </div>
            </div>
            <div class="part4_r">
              <ul>
                <li v-for="(item_data,index_data) in item.zhuanjia.slice(0,6)" @click="part4click2(index_data)">
                  <a>
                    <p><img :src="item_data.images" alt="专家图片"></p>
                    <div><span>{{item_data.name}}</span>{{item_data.zhiwu}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="part5 clearFix">
        <div class="part5_l">
          <dl class="title clearFix">
            <dt class="on">健康园地</dt>
            <dd><a href="#">更多<span>>></span></a></dd>
          </dl>
          <ul>
            <li class="first" v-for="item in index_jkyd.slice(0,2)">
              <a class="img"><img :src="item.thumb" alt="健康园地"></a>
              <div class="con">
                <a>{{item.title}}</a>
                <div>{{item.summary | word_lable | word_len(0,30)}}</div>
              </div>
            </li>
            <li v-for="item in index_jkyd.slice(2,10)">
              <a class="tit">{{item.title}}</a>
              <span class="date">{{item.created_at}}</span>
            </li>
          </ul>
        </div>
        <div class="part5_r">
          <dl class="title clearFix">
            <dt class="on">联系我们</dt>
            <dd><a href="#">更多<span>>></span></a></dd>
          </dl>
          <div class="con">
            <dl>
              <dt>联系电话</dt>
              <dd>总值班室：<span>{{config.zzbsdh}}</span></dd>
              <dd>护理总值班室：<span>{{config.hulizzbs}}</span></dd>
              <dd>院办公室：<span>{{config.yuanbgs}}</span></dd>
            </dl>
            <dl>
              <dt>医院地址</dt>
              <dd>{{config.address}}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="part6 clearFix">
        <div class="part6_l">
          <dl class="title clearFix">
            <dt class="on">医疗设备</dt>
            <dd><a href="#">更多<span>>></span></a></dd>
          </dl>
          <div class="part6_ll">
            <ul>
              <li :class="{on:index===part6index}" v-for="(item,index) in index_ylsb" @click="part6click(index)">{{item.name}}</li>
            </ul>
          </div>
          <div class="part6_lr" v-show="index===part6index" v-for="(item,index) in index_ylsb">
            <a class="img"><img :src="item.img1" alt="医疗设备"></a>
            <div class="con">
              <a class="tit">{{item.name}}</a>
              <div class="desc">{{item.jianjie | word_lable}}</div>
            </div>
          </div>
        </div>
        <div class="part6_r">
          <dl class="title clearFix">
            <dt class="on">就诊指南</dt>
            <dd><a href="#">更多<span>>></span></a></dd>
          </dl>
          <ul>
            <li v-for="item in jzzn"><a>{{item.title}}</a></li>
          </ul>
        </div>
      </div>
      <div class="part7">
        <dl class="title clearFix">
          <dt class="on">医院环境</dt>
          <dd><a href="#">更多<span>>></span></a></dd>
        </dl>
        <Animation :list="yyhj" :part7animation="true"></Animation>
      </div>
    </div>
    <div class="webApp">
      webApp
    </div>
  </div>
</template>

<script>
  import Animation from './public/Animation'
  export default{
    name: 'Index',
    props:[
      "index_yyxw",
      "index_hyxw",
      "yyjj",
      "departmenttype",
      "departmentdata",
      "expertdata",
      "config",
      "index_jkyd",
      "index_ylsb",
      "jzzn",
      "yyhj",
    ],
    components:{Animation},
    data(){
      return{
        flog:true,
        part1tab:true,
        part3index:0,
        part4index:0,
        part4index2:0,
        part4olh:38,
        s:0,
        prev_next:false,
        part6index:0,
      }
    },
    created(){

    },
    methods:{
      news(){
        this.part1tab=!this.part1tab;
      },
      part3click(index){
        this.part3index=index;
        let navid=this.departmenttype[index].id;
        this.$emit('navid',3,navid);
      },
      part4click(index){
        this.part4index=index;
      },
      part4click2(index){
        this.part4index2=index;
      },
      part4prev_next(index){
        if(index>0){
          this.s++;
        }else{
          this.s--;
        }
        let part4olh=document.getElementById("con_tol").clientHeight;
        if(this.s>Math.floor(part4olh/this.part4olh)-1){
          this.s=Math.floor(part4olh/this.part4olh)-1;
        }
        if(this.s<0){
          this.s=0;
        }
      },
      part4Show(flag){
        this.prev_next=flag;
      },
      part6click(index){
        this.part6index=index;
      },
    },
  }
</script>
