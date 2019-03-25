<template>
<div>
  <div class="common single pc" :style="'height: '+fullHeight+'px;margin-top:-'+fullHeight/2+'px'">
    <div class="page_intro page_intro1" :class="{on:page_intro_on,prev_page:i==prev_index,next_page:i==next_index}" ref="prev_page" v-for="i in 4" :style="'height: '+(fullHeight-20)+'px;top:'+2*i+'px;left:'+i+'px;z-index:'+(4-i)">
      <div class="click_tag" @click="prev_next(i,'.page_intro1')"></div>
      <div class="con" v-show="i==1">
        <div class="tit">个人简历</div>
        <div class="img"><img src="../assets/tx.jpg" alt="头像"></div>
        <div v-for="(item,index) in intro_lists" v-if="index==0">
          <div
            v-for="(item_item,index_index) in item.baseInfo"
            v-if="index_index==0||index_index==3||index_index==5||index_index==6">
            {{item_item.description}}：{{item_item.title}}
          </div>
        </div>
      </div>
      <div class="con" v-show="i==2">
        <h3 class="top">基本信息</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==0">
            <div v-for="(item_item,index_index) in item.baseInfo" v-if="index_index!=1">{{item_item.description}}：{{item_item.title}}</div>
          </div>
        </div>
        <h3 class="top">教育背景</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==1">
            <table>
              <tr v-for="(item_item,index_index) in item.education"><td>{{item_item.title}}</td><td>{{item_item.date}}</td><td>{{item_item.description}}</td></tr>
            </table>
          </div>
        </div>
        <h3 class="top">相关技术/开发工具</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==2">
            <div v-for="(item_item,index_index) in item.experience" v-if="index_index==3||index_index==4">
              {{item_item.description}}：{{item_item.title}}
            </div>
          </div>
        </div>
      </div>
      <div class="con" v-show="i==3">
        <h3 class="top">项目经验</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==2">
            <div class="tit">
              <p v-for="(item_item,index_index) in item.experience" v-if="index_index==0||index_index==1||index_index==2">{{item_item.title}}</p>
            </div>
            <div v-for="(item_item,index_index) in item.experience" v-if="index_index==5">
              <div v-for="i in item_item.project">
                <a :href="i.href">{{i.title}}</a>{{i.description}}
              </div>
            </div>
          </div>
        </div>
        <h3 class="top">自我介绍</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==3">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="common single web_app" :style="'margin-top:-'+fullHeight/0.8/2+'px'">
    <div class="page_intro page_intro2" :class="{on:page_intro_on,prev_page:i==prev_index,next_page:i==next_index}" ref="prev_page" v-for="i in 4">
      <div class="con" v-show="i==1">
        <div class="img"><img src="../assets/tx.jpg" alt="头像"></div>
        <div class="desc" v-for="(item,index) in intro_lists" v-if="index==0">
          <div
            v-for="(item_item,index_index) in item.baseInfo"
            v-if="index_index==0||index_index==3||index_index==5||index_index==6">
            {{item_item.description}}：{{item_item.title}}
          </div>
        </div>
      </div>
      <div class="con" v-show="i==2">
        <h3 class="top">基本信息</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==0">
            <div v-for="(item_item,index_index) in item.baseInfo" v-if="index_index!=1">{{item_item.description}}：{{item_item.title}}</div>
          </div>
        </div>
        <h3 class="top">教育背景</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==1">
            <table>
              <tr v-for="(item_item,index_index) in item.education"><td>{{item_item.title}}</td><td>{{item_item.date}}</td><td>{{item_item.description}}</td></tr>
            </table>
          </div>
        </div>
        <h3 class="top">相关技术/开发工具</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==2">
            <div v-for="(item_item,index_index) in item.experience" v-if="index_index==3||index_index==4">
              {{item_item.description}}：{{item_item.title}}
            </div>
          </div>
        </div>
      </div>
      <div class="con" v-show="i==3">
        <h3 class="top">项目经验</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==2">
            <div class="tit">
              <p v-for="(item_item,index_index) in item.experience" v-if="index_index==0||index_index==1||index_index==2">{{item_item.title}}</p>
            </div>
            <div v-for="(item_item,index_index) in item.experience" v-if="index_index==5">
              <div v-for="i in item_item.project">
                <a :href="i.href">{{i.title}}</a>{{i.description}}
              </div>
            </div>
          </div>
        </div>
        <h3 class="top">自我介绍</h3>
        <div class="down">
          <div v-for="(item,index) in intro_lists" v-if="index==3">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "single",
        props: ["fullHeight","intro_lists"],
        data() {
            return {
              click_tag:1,
              prev_index:-1,
              next_index:0,
              page_intro_on:false,
            }
        },
        created() {

        },
        methods: {
          prev_next(index,tag){
            var page_intro=document.querySelectorAll(tag);
            if(index>page_intro.length-2||index==2){
              this.page_intro_on=false;
              this.prev_index=-1;
              this.next_index=this.prev_index+1;
              for( var i=0;i<page_intro.length;i++){
                page_intro[i].style.zIndex=page_intro.length-i;
              }
            }
            else {
              if(index-this.prev_index==1){
                this.page_intro_on=true;
                this.prev_index=-1;
                this.next_index=index-2;
                for( var i=0;i<page_intro.length;i++){
                  (i<this.next_index)?page_intro[i].style.zIndex=i+1:page_intro[i].style.zIndex=page_intro.length-i;
                }
              }
              else{
                this.page_intro_on=true;
                this.prev_index=index;
                this.next_index=this.prev_index+1;
                for( var i=0;i<page_intro.length;i++){
                  (i<=index)?page_intro[i].style.zIndex=i+1:page_intro[i].style.zIndex=page_intro.length-i;
                }
              }
            }
          }
        }
    }
</script>

<style scoped>

</style>
