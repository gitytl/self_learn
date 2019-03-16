import Vue from 'vue'
import Router from 'vue-router'
import promise from 'es6-promise'
import baseConfig from "../baseConfig";
import Axios from "axios";

import Index from '@/components/Index'
import Other from '@/components/public/Other'
import single_intro from '@/components/single_intro'
import lists_hobby from '@/components/lists_hobby'
import lists_poetry from '@/components/lists_poetry'

Vue.use(Router)
Vue.use(baseConfig)
let module='';
promise.polyfill();
Vue.prototype.$axios = Axios;
export default new Router({
  linkActiveClass: 'on',
  linkExactActiveClass: 'on',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    /*包含二级导航*/
    {
      path: '/:main_nav_name/:main_nav_id',
      name:'main_nav',
      component: Other,
      /*/*路由指定跳转*!/
      redirect:to=>{
        if (to.path === '/survey/1') {
          return { path: '/survey/1/jianjie/2'}
        }
      },*/
      children: [
        {
          /*path: ':sub_nav_name/:sub_nav_id/:module',*/
          path: ':module',
          name:'sub_nav',
          components: {
            single_intro: single_intro,
            lists_hobby: lists_hobby,
            lists_poetry: lists_poetry,
          },
        },
      ]
    }
  ]
})
